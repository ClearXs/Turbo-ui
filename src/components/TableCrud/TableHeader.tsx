import { Button, Form, Space } from '@douyinfe/semi-ui';
import { directGetIcon } from '../Icon';
import { useState } from 'react';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { TableApi, TableContext, TableCrudProps } from './interface';
import { IdEntity } from '@/api/interface';
import { TableColumnDecorator } from './table';

type Props<T extends IdEntity> = {
  tableContext: TableContext<T>;
  tableApi: TableApi<T>;
  columnDecorator: TableColumnDecorator<T>;
  params: TableCrudProps<T>['params'];
};

function TableHeader<T extends IdEntity>({
  tableContext,
  tableApi,
  columnDecorator,
  params,
}: Props<T>) {
  const [formApi, setFormApi] = useState<FormApi | undefined>(undefined);

  const searchColumns = (tableContext?.props.columns || []).filter((col) => {
    return typeof col.search === 'function'
      ? col.search(tableContext as TableContext<T>)
      : col.search;
  });

  return (
    searchColumns.length > 0 && (
      <Form
        labelPosition="left"
        className="flex"
        getFormApi={setFormApi}
        initValues={tableContext?.search}
      >
        <Space>
          {searchColumns?.map((col) => columnDecorator.render(col, 'search'))}
        </Space>
        <Space className="ml-4">
          <Button
            type="primary"
            icon={directGetIcon('IconSearch')}
            onClick={() => {
              // 相同key 默认值的优先级 > 表单值
              const values = Object.assign(formApi?.getValues(), params);
              const newTableContext = {
                ...tableContext,
                search: values,
              } as TableContext<T>;
              tableApi.listOrPageOrTree(newTableContext);
            }}
          >
            搜索
          </Button>
          <Button
            type="tertiary"
            icon={directGetIcon('IconRefresh')}
            onClick={() => {
              formApi?.reset();
              const newTableContext = {
                ...tableContext,
                search: params || {},
              } as TableContext<T>;
              tableApi.listOrPageOrTree(newTableContext);
            }}
          >
            重制
          </Button>
        </Space>
      </Form>
    )
  );
}
export default TableHeader;
