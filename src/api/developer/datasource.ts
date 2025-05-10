import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, IdEntity, R, TenantEntity } from '..';

export interface DataSource extends TenantEntity {
  /**
   * 数据源名称
   */
  name: string;

  /**
   * 数据源连接地址
   */
  address: string;

  /**
   * 连接用户名
   */
  username: string;

  /**
   * 连接密码
   */
  password: string;

  /**
   * 连接数据库
   */
  database: string;

  /**
   * 数据源引擎
   */
  engine: string;
}

export type TableColumn = {
  tableName: string;
  table: Table;
  columnDefs: ColumnDef[];
};

export type Table = {
  name: string;
  alias: string;
  schema: string;
  catalog: string;
  type: string;
  comment: string;
};

export type ColumnDef = IdEntity & {
  dslName: string;
  comment: string;
  dataType: DataType;
  defaultValue: any;
  isPk: boolean;
  isFk: boolean;
  isNonNull: boolean;
  isNull: boolean;
  isUnique: boolean;
  isDeleted: boolean;
  undeleted: any;
  deleted: any;
};

export type DataType = {
  dslType: DSLType;
  precision: number;
  scale: number;
};

export type DSLType = {
  jdbcType: number;
  name: string;
};

export interface DataSourceApi extends GeneralApi<DataSource> {
  testConnection: (dataSource: DataSource) => Promise<R<boolean>>;
  showTable: (id: string, tableName: string) => Promise<R<TableColumn>>;
  showTables: (id: string) => Promise<R<TableColumn[]>>;
}

class DataSourceApiImpl
  extends GeneralApiImpl<DataSource>
  implements DataSourceApi
{
  testConnection(dataSource: DataSource): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + '/test-connection', dataSource)
      .then((res) => {
        return res.data;
      });
  }

  showTable(id: string, tableName: string): Promise<R<TableColumn>> {
    return this.request
      .get(this.apiPath + `/show-table/${id}/${tableName}`)
      .then((res) => {
        return res.data;
      });
  }

  showTables(id: string): Promise<R<TableColumn[]>> {
    return this.request.get(this.apiPath + `/show-tables/${id}`).then((res) => {
      return res.data;
    });
  }
}

export default function useDataSourceApi(): DataSourceApi {
  const request = useRequest();
  return new DataSourceApiImpl('/api/dev/datasource', request);
}
