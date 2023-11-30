import { IdEntity } from '@/api/interface';
import { Constant } from '@/constant/interface';
import { FormColumnProps, FormContext, FormProps } from './interface';
import { useEffect, useState } from 'react';
import { Col, Form, Modal, Notification, Row, Spin } from '@douyinfe/semi-ui';
import { FormColumnDecorator, getFormColumnDecorator } from './form';
import { directGetIcon } from '../Icon';
import useDicApi, { Dic, format } from '@/api/system/dic';
import _ from 'lodash';

const formTypeList: Record<string, Constant> = {
  add: {
    value: 'add',
    label: '添加',
    icon: '',
  },
  edit: {
    value: 'edit',
    label: '编辑',
    icon: '',
  },
  details: {
    value: 'details',
    label: '明细',
    icon: '',
  },
};

function TForm<T extends IdEntity>(props: FormProps<T>) {
  const [formContext, setFormContext] = useState<FormContext<T>>();
  const [showColumns, setShowColumns] = useState<FormColumnProps<T>[]>([]);
  const api = props.useApi?.();
  const dicApi = useDicApi();

  const formType = formTypeList[formContext?.type || 'add'];
  const title = formType.label;

  useEffect(() => {
    const decorator = props.decorator || getFormColumnDecorator<T>();
    // formContext 初始化
    const formContext = {
      type: 'add',
      props,
      visible: false,
      loading: false,
      decorator,
      dicApi,
      dicValues: {},
      getDefaultValues: () => {
        // 1.父级传递的params
        // 2.column上默认值
        const columnValues = props.columns
          .filter((column) => column.initValue !== undefined)
          .reduce(
            (pre, cur) => {
              pre[cur.field] = cur.initValue;
              return pre;
            },
            {} as Record<string, any>,
          );
        return Object.assign({}, props.params, columnValues);
      },
      newContext: (context: FormContext<T>) => {
        decorator.setFormContext(context);
        props.getFormContext?.(context);
        setFormContext(context);
      },
    } as FormContext<T>;
    const showColumns =
      props.columns.filter((column) => {
        let showForm;
        if (typeof column.form === 'function') {
          showForm = column.form(formContext as FormContext<T>);
        } else {
          showForm = column.form;
        }
        return column.type !== 'undefined' && showForm !== false;
      }) || [];

    // 初始化字典项
    const combine = props.columns
      .filter((column) => column.dic !== undefined)
      .map((column) => dicApi.tree({ entity: { code: column.dic } }));

    if (!_.isEmpty(combine)) {
      Promise.all(combine).then((all) => {
        const dicValues: Record<string, Constant[]> = all.reduce<
          Record<string, Constant[]>
        >((pre, cur) => {
          if (cur.code === 200) {
            const data = cur.data;
            // 编码查询字典树不会存储多个
            const dicTree = data.length > 0 && data[0];
            if (dicTree && !_.isEmpty(dicTree.children)) {
              const dics = format(dicTree.children as Dic[]);
              pre[dicTree.code] = dics;
            }
          }
          return pre;
        }, {});
        const newFormContext = { ...formContext };
        newFormContext.dicValues = dicValues;
        formContext.newContext(newFormContext);
      });
    }

    // 值设置
    formContext.newContext(formContext);
    setShowColumns(showColumns);
  }, []);

  return (
    <>
      <Spin spinning={formContext?.loading || false}>
        <Modal
          title={title}
          icon={directGetIcon(formType.icon)}
          visible={formContext?.visible}
          closeOnEsc={true}
          size="large"
          okButtonProps={{ disabled: formContext?.type === 'details' }}
          onOk={() => {
            formContext?.formApi
              ?.validate()
              .then((data) => {
                const newContext = {
                  ...formContext,
                  loading: true,
                } as FormContext<T>;
                formContext.newContext(newContext);
                // 相同key优先级 默认值 > 表单值
                const values = Object.assign(data, props.params);
                api
                  .saveOrUpdate(values)
                  .then((res) => {
                    const newContext = {
                      ...formContext,
                      loading: false,
                      visible: false,
                    } as FormContext<T>;
                    if (res.code === 200 && res.data) {
                      Notification.success({
                        position: 'top',
                        content: res.message,
                      });
                      props.onOk?.(newContext);
                    } else {
                      Notification.error({
                        position: 'top',
                        content: res.message,
                      });
                      props.onError?.(new Error(res.message), newContext);
                    }
                    formContext.newContext(newContext);
                  })
                  .catch((err) => {
                    const newContext = {
                      ...formContext,
                      loading: false,
                    } as FormContext<T>;
                    formContext.newContext(newContext);
                    props.onError?.(err, formContext);
                  });
              })
              .catch((err) => {
                Notification.error({
                  content: err.name,
                  position: 'top',
                });
              });
          }}
          onCancel={() => {
            const newFormContext = {
              ...formContext,
              visible: false,
            } as FormContext<T>;
            formContext?.newContext(newFormContext as FormContext<T>);
          }}
        >
          <Form
            labelPosition="left"
            labelAlign="right"
            getFormApi={(formApi) => {
              const newFormContext = {
                ...formContext,
                formApi,
              };
              formContext?.newContext(newFormContext as FormContext<T>);
              props.getFormContext?.(newFormContext as FormContext<T>);
            }}
            initValues={formContext?.values}
            disabled={formContext?.type === 'details'}
          >
            <FormLayout<T>
              showColumns={showColumns}
              decorator={formContext?.decorator}
            />
          </Form>
        </Modal>
      </Spin>
    </>
  );
}

type FormLayoutProps<T extends IdEntity> = {
  showColumns: FormColumnProps<T>[];
  decorator?: FormColumnDecorator<T>;
};

function FormLayout<T extends IdEntity>({
  showColumns,
  decorator,
}: FormLayoutProps<T>) {
  // 表单布局样式
  const parts: FormColumnProps<T>[][] = [];
  let part: FormColumnProps<T>[] = [];

  for (let i = 0; i < showColumns.length; i++) {
    const column = showColumns[i];
    // 判断是否成为一行，如果在上一个未充满整行，'part'则会存在值，此时让part单独成一行
    if (column.line) {
      if (part.length > 0) {
        parts.push(part);
        part = [];
      }
      part = [column];
      parts.push(part);
      part = [];
      continue;
    }
    // 判断part参数与当前column的span是否超过24一行
    // 如果超过则先把part中单独成一行，否则添加在一起
    const totalSpan = [...part, column]
      .map((c) => c.span || 12)
      .reduce((pre, cur) => pre + cur, 0);
    if (totalSpan >= 24) {
      part.push(column);
      parts.push(part);
      part = [];
    } else {
      part.push(column);
    }
    if (i === showColumns.length - 1) {
      parts.push(part);
    }
  }

  return parts.map((p) => {
    return (
      <Row>
        {p.map((sub) => {
          return (
            <Col
              span={sub.line ? 24 : sub.span || 12}
              style={{ paddingLeft: '1em', paddingRight: '1em' }}
            >
              {decorator?.render(sub, 'form')}
            </Col>
          );
        })}
      </Row>
    );
  });
}

export default TForm;
