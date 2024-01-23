import TableCrud from '@/components/TableCrud';
import useDataSourceApi, { DataSource } from '@/api/developer/datasource';
import DataSourceHelper from './helper';

const DataSource: React.FC = () => {
  return (
    <TableCrud<DataSource>
      mode="page"
      columns={DataSourceHelper.getColumns()}
      useApi={useDataSourceApi}
      operateBar={{
        append: [
          {
            code: 'test',
            name: '测试连接',
            type: 'primary',
            onClick(tableContext, value) {},
          },
          {
            code: 'dataTable',
            name: '数据表',
            type: 'primary',
            onClick(tableContext, value) {},
          },
        ],
      }}
    />
  );
};

export default DataSource;
