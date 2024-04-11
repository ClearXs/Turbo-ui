import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export interface Params extends TenantEntity {
  /**
   * 名称
   */
  name: string;

  /**
   * key
   */
  key: string;

  /**
   * 值
   */
  value: string;

  /**
   * 描述
   */
  description: string;
}

export interface ParamsApi extends GeneralApi<Params> {}

class ParamsApiImpl extends GeneralApiImpl<Params> implements ParamsApi {}

export default function useParamsApi(): ParamsApi {
  const request = useRequest();
  return new ParamsApiImpl('/api/sys/params', request);
}
