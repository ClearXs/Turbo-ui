import { Form } from '@douyinfe/semi-ui/lib/es/form';
import { TableColumnProps, TableContext } from './TableCrud';
import { Col, Modal, Notification, Row, Spin } from '@douyinfe/semi-ui';
import { TableContextState } from '@/hook/table';
import { useRecoilState } from 'recoil';
import { ColumnDecorator, TableApi } from './table';
import _ from 'lodash';
import { Constant } from '@/constant/interface';
import { directGetIcon } from '../Icon';

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

const FormLayout: React.FC<{
  showColumns: TableColumnProps[];
  tableContext: TableContext;
  columnDecorator: ColumnDecorator<any>;
}> = ({ showColumns, tableContext, columnDecorator }) => {
  // 表单布局样式
  const parts: TableColumnProps[][] = [];
  let part: TableColumnProps[] = [];

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
              {columnDecorator.render(
                tableContext as TableContext,
                sub,
                'form',
              )}
            </Col>
          );
        })}
      </Row>
    );
  });
};

const TableForm: React.FC<{
  columns?: TableColumnProps[];
  tableApi: TableApi<any>;
  columnDecorator: ColumnDecorator<any>;
}> = ({ columns = [], tableApi, columnDecorator }) => {
  const [tableContext, setTableContext] = useRecoilState(TableContextState);

  const formType = formTypeList[tableContext?.form.type || 'add'];

  const title =
    (tableContext?.props.title &&
      `${tableContext?.props.title?.toString()} - [${formType.label}]`) ||
    formType.label;

  const showColumns = columns.filter(
    (column) => column.form !== false && column.type !== 'undefined',
  );

  return (
    <>
      <Spin spinning={tableContext?.form.loading || false}>
        <Modal
          title={title}
          icon={directGetIcon(formType.icon)}
          visible={tableContext?.form.visible}
          closeOnEsc={true}
          size="large"
          okButtonProps={{ disabled: tableContext?.form.type === 'details' }}
          onOk={() => {
            tableContext?.form.formApi
              ?.validate()
              .then((data) => {
                tableApi.saveOrUpdate(tableContext as TableContext, data);
              })
              .catch((err) => {
                Notification.error({
                  content: err.name,
                  position: 'top',
                });
              });
          }}
          onCancel={() => {
            const newTableContext = {
              ...tableContext,
              form: {
                ...tableContext?.form,
                visible: false,
              },
            } as TableContext;
            setTableContext(newTableContext);
          }}
        >
          <Form
            labelPosition="left"
            labelAlign="right"
            getFormApi={(formApi) => {
              const newTableContext = {
                ...tableContext,
                form: {
                  ...tableContext?.form,
                  formApi,
                },
              } as TableContext;
              setTableContext(newTableContext);
            }}
            initValues={tableContext?.form.values}
            disabled={tableContext?.form.type === 'details'}
          >
            <FormLayout
              showColumns={showColumns}
              tableContext={tableContext as TableContext}
              columnDecorator={columnDecorator}
            />
          </Form>
        </Modal>
      </Spin>
    </>
  );
};

export default TableForm;
