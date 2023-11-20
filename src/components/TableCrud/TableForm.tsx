import { Form, FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { TableColumnProps, TableContext } from './TableCrud';
import { useState } from 'react';
import { Modal, Notification, Spin } from '@douyinfe/semi-ui';
import { TableContextState } from '@/hook/table';
import { useRecoilState } from 'recoil';
import { ColumnDecorator, TableApi } from './table';

const formType: Record<string, string> = {
  add: '添加',
  edit: '编辑',
  details: '明细',
};

/**
 * 表单布局样式
 * @param columns columns
 * @returns
 */
const formLayoutRender = (columns: TableColumnProps[]) => {
  return <></>;
};

const TableForm: React.FC<{
  columns?: TableColumnProps[];
  tableApi: TableApi<any>;
  columnDecorator: ColumnDecorator<any>;
}> = ({ columns = [], tableApi, columnDecorator }) => {
  const [formApi, setFormApi] = useState<FormApi | undefined>(undefined);
  const [tableContext, setTableContext] = useRecoilState(TableContextState);

  const title =
    (tableContext?.props.title &&
      `${tableContext?.props.title?.toString()} - [${
        formType[tableContext?.form.type || 'add']
      }]`) ||
    formType[tableContext?.form.type || 'add'];
  return (
    <>
      <Spin spinning={tableContext?.form.loading || false}>
        <Modal
          title={title}
          visible={tableContext?.form.visible}
          closeOnEsc={true}
          size="medium"
          okButtonProps={{ disabled: tableContext?.form.type === 'details' }}
          onOk={() => {
            formApi
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
                visible: false,
              },
            } as TableContext;
            setTableContext(newTableContext);
          }}
        >
          <Form
            labelPosition="left"
            labelAlign="right"
            getFormApi={setFormApi}
            initValues={tableContext?.form.values}
            disabled={tableContext?.form.type === 'details'}
          >
            {columns
              .filter((column) => column.form !== false)
              .map((col) =>
                columnDecorator.render(
                  tableContext as TableContext,
                  col,
                  'form',
                ),
              )}
          </Form>
        </Modal>
      </Spin>
    </>
  );
};

export default TableForm;
