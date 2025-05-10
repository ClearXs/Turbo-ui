import useRequest from '@/hook/useRequest';
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

export class ParamsApiImpl
  extends GeneralApiImpl<Params>
  implements ParamsApi {}

export default function useParamsApi() {
  const request = useRequest();
  return new ParamsApiImpl('/api/sys/params', request);
}
