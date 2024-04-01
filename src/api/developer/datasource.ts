import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, R, TenantEntity } from '..';

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

export interface DataSourceApi extends GeneralApi<DataSource> {
  testConnection: (dataSource: DataSource) => Promise<R<boolean>>;
  showTables: (id: string) => Promise<R<Record<string, object>>>;
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

  showTables(id: string): Promise<R<Record<string, object>>> {
    return this.request.get(this.apiPath + `/show-tables/${id}`).then((res) => {
      return res.data;
    });
  }
}

export default function useDataSourceApi(): DataSourceApi {
  const request = useRequest();
  return new DataSourceApiImpl('/api/dev/datasource', request);
}
