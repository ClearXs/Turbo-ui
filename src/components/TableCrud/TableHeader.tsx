import { Button, Form, Space } from '@douyinfe/semi-ui';
import { TableColumnProps, TableContext } from './TableCrud';
import { directGetIcon } from '../Icon';
import { useEffect, useState } from 'react';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { TableContextState } from '@/hook/table';
import { useRecoilValue } from 'recoil';
import { ColumnDecorator, TableApi } from './table';

const TableHeader: React.FC<{
  columns?: TableColumnProps[];
  tableApi: TableApi<any>;
  columnDecorator: ColumnDecorator<any>;
}> = ({ columns = [], tableApi, columnDecorator }) => {
  const [searchColumns, setSearchColumns] = useState<TableColumnProps[]>([]);
  const [formApi, setFormApi] = useState<FormApi | undefined>(undefined);
  const tableContext = useRecoilValue(TableContextState);

  useEffect(() => {
    const searchColumns = columns.filter((col) => col.search);
    setSearchColumns(searchColumns);
  }, []);

  return (
    searchColumns.length > 0 && (
      <Form labelPosition="left" className="flex" getFormApi={setFormApi}>
        <Space>
          {searchColumns?.map((col) => columnDecorator.render(col, 'search'))}
        </Space>
        <Space className="ml-4">
          <Button
            type="primary"
            icon={directGetIcon('IconSearch')}
            onClick={() => {
              const values = formApi?.getValues();
              const newTableContext = {
                ...tableContext,
                search: values,
              } as TableContext;
              tableApi.pageOrList(newTableContext);
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
                search: {},
              } as TableContext;
              tableApi.pageOrList(newTableContext);
            }}
          >
            重制
          </Button>
        </Space>
      </Form>
    )
  );
};
export default TableHeader;
