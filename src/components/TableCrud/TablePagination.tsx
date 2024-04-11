import { IdEntity } from '@/api';
import { TableContext } from './interface';
import { Pagination, Typography } from '@douyinfe/semi-ui';
import { TablePaginationProps as SemiTablePaginationProps } from '@douyinfe/semi-ui/lib/es/table';
import { useContext } from 'react';
import { TableCrudContext } from './context/table';

export type TablePaginationProps = {
  currentPage: SemiTablePaginationProps['currentPage'];
  pageSize: SemiTablePaginationProps['pageSize'];
  total: SemiTablePaginationProps['total'];
};

const TablePagination = <T extends IdEntity>({
  pageSize = 10,
  currentPage = 1,
  total = 0,
}: TablePaginationProps) => {
  const tableContext = useContext<TableContext<T>>(TableCrudContext);
  return (
    <div className="fixed bottom-4 min-h-4">
      <div className="flex items-center">
        <Typography.Text type="quaternary">{`显示第 ${
          pageSize * (currentPage - 1) + 1
        } 条-第 ${currentPage * pageSize} 条，共 ${total} 条`}</Typography.Text>
        <Pagination
          className="fixed right-5"
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          showSizeChanger
          showQuickJumper
          showTotal
          onChange={(currentPage, pageSize) => {
            const pagination: SemiTablePaginationProps = {
              currentPage,
              pageSize,
              total,
            };
            tableContext?.tableApi.page(tableContext, pagination);
          }}
        />
      </div>
    </div>
  );
};

export default TablePagination;
