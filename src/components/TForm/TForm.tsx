import { GeneralApi, IdEntity } from '@/api/interface';
import { Constant } from '@/constant/interface';
import { FormContext, FormProps, RemoteProps } from './interface';
import { Suspense, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { getFormColumnDecorator } from './form';
import useDicApi, { Dic, DicApi, format } from '@/api/system/dic';
import _ from 'lodash';
import { findPairValue, kvPairToObject } from './util';
import useRequest, { InternalRequest, createRequest } from '@/hook/request';
import FormliyForm from './formily/FormilyForm';
import { Form as CoreForm } from '@formily/core';
import { observable } from '@formily/reactive';

const loadDataSet = <T extends IdEntity>(
  formContext: FormContext<T>,
  dicApi: DicApi,
  request: InternalRequest,
) => {
  const { columns } = formContext;

  // 初始化远端数据项
  const remoteCombine =
    columns
      .filter((column) => Object.hasOwn(column, 'remote'))
      .map((column) => {
        const records: Record<string, Constant[]> = {};
        const {
          url,
          method = 'POST',
          params = [],
          headers = [],
          internal = true,
          mapping = [
            { key: 'code', value: 'code' },
            { key: 'data', value: 'data' },
            { key: 'success', value: 200 },
            { key: 'value', value: 'id' },
            { key: 'label', value: 'name' },
          ],
          formatter = (res: Record<string, any>) => {
            const code = findPairValue(mapping, 'code');
            const success = findPairValue(mapping, 'success');
            const data = findPairValue(mapping, 'data');
            const value = findPairValue(mapping, 'value');
            const label = findPairValue(mapping, 'label');

            if (res && res[code] === success) {
              const collection = res[data];
              if (collection && _.isArray(collection)) {
                const constant = collection.map((record) => {
                  return {
                    value: record?.[value],
                    label: record?.[label],
                  } as Constant;
                });
                records[column.field] = constant;
              }
            }
            return records;
          },
        } = column['remote'] as RemoteProps;

        const paramsRecord = kvPairToObject(params);
        const headersRecord = kvPairToObject(headers);

        const requestPromise = internal
          ? request.request(url, method, paramsRecord, headersRecord)
          : createRequest().request(url, method, paramsRecord, headersRecord);
        return requestPromise
          .then((res) => {
            if (res.status === 200) {
              const result = res.data;
              return formatter(result);
            } else {
              return Promise.reject(
                `request ${url} has fatal error ${res.data}, make sure 'url' 'params' 'headers'... correct`,
              );
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }) || Promise.resolve([]);

  // 初始化字典项
  const dicCombine =
    columns
      .filter((column) => Object.hasOwn(column, 'dictionary'))
      .map((column) => {
        return dicApi
          .tree({ entity: { code: column['dictionary'] } })
          .then((res) => {
            const records: Record<string, any> = {};
            if (res.code === 200) {
              const data = res.data;
              // 编码查询字典树不会存储多个
              const dicTree = data.length > 0 && data[0];
              if (dicTree && !_.isEmpty(dicTree.children)) {
                const dics = format(dicTree.children as Dic[]);
                records[column['dictionary']] = dics;
              }
            }
            return records;
          });
      }) || Promise.resolve([]);

  Promise.all([...remoteCombine, ...dicCombine]).then((all) => {
    const dataSet = all.reduce((buf, cur) => {
      return { ...buf, ...cur };
    }, {});
    formContext.dataSet = dataSet;
  });
};

function TForm<T extends IdEntity>(props: FormProps<T>) {
  const dicApi = useDicApi();
  const request = useRequest();
  const formRef = useRef<CoreForm>();
  const formContext = useMemo(() => {
    const decorator = props.decorator || getFormColumnDecorator<T>(undefined);
    const { columns } = props;
    const formContext: FormContext<T> = {
      type: props.type || 'add',
      props,
      visible: props.immediateVisible || false,
      loading: false,
      decorator,
      dataSet: {},
      valid: formRef.current?.valid || false,
      validating: formRef.current?.validating || false,
      validate: (pattern) => {
        formRef.current?.validate(pattern);
      },
      submit: (onSubmit) => {
        return formRef.current?.submit(onSubmit);
      },
      reset: (pattern, option) => {
        return formRef.current?.reset(pattern, option);
      },
      getDefaultValues() {
        // 1.父级传递的params
        // 2.column上默认值
        const columnValues = columns
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
      getValues() {
        return formRef.current?.values;
      },
      open() {
        formContext.visible = true;
      },
      close() {
        formContext.visible = false;
      },
      columns: [],
    };

    const showColumns =
      columns.filter((column) => {
        let showForm;
        if (typeof column.form === 'function') {
          showForm = column.form(formContext);
        } else {
          showForm = column.form;
        }
        return column.type !== 'undefined' && showForm !== false;
      }) || [];
    formContext.columns = showColumns;
    // 使FormContext成为observable对象
    const observerFormContext = observable<FormContext<T>>(formContext);
    decorator.setFormContext(observerFormContext);
    // 加载表单数据集
    loadDataSet(observerFormContext, dicApi, request);
    return observerFormContext;
  }, []);

  // 设置api
  const relationApis: Map<string, GeneralApi<any>> = new Map();
  for (const column of formContext.columns) {
    const { relation } = column;
    if (relation) {
      relation.helper.getApi &&
        relationApis.set(column.field, relation.helper.getApi());
    }
  }
  formContext.decorator.setRelationApis(relationApis);

  props.getFormContext?.(formContext);

  return (
    <FormliyForm
      formProps={props}
      formContext={formContext}
      labelWidth={120}
      colon={false}
      labelAlign="right"
      wrapperAlign="left"
      feedbackLayout="loose"
      tooltipLayout="text"
      effects={(form) => (formRef.current = form)}
    />
  );
}

TForm.open = <T extends IdEntity>(props: FormProps<T>) => {
  // create a dom in adapter?
  const div = document.createElement('div');
  const container = createRoot(div);
  document.body.appendChild(div);

  const destroy = () => {
    container.unmount();
  };

  function open(params: Partial<T> = {}) {
    const newProps: FormProps<T> = { ...props, immediateVisible: true, params };
    render(newProps);
  }

  function close() {
    const newProps: FormProps<T> = { ...props, immediateVisible: false };
    render(newProps);
  }

  function render(props: FormProps<T>) {
    //@ts-ignore
    container.render(
      <Suspense>
        <TForm {...props} />
      </Suspense>,
    );
  }

  return { open, close, destroy };
};

export default TForm;
