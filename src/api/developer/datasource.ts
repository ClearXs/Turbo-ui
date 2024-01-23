import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '../interface';

export interface DataSource extends TenantEntity {
  /**
   * 数据源名称
   */
  name: string;

  /**
   * 数据源连接地址
   */
  url: string;

  /**
   * 连接用户名
   */
  username: string;

  /**
   * 连接密码
   */
  password: string;

  /**
   * 数据源引擎
   */
  engine: string;
}

export interface DataSourceApi extends GeneralApi<DataSource> {}

class DataSourceApiImpl
  extends GeneralApiImpl<DataSource>
  implements DataSourceApi {}

export default function useDataSourceApi(): DataSourceApi {
  const request = useRequest();
  return new DataSourceApiImpl('/api/dev/datasource', request);
}
