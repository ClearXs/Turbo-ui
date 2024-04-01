import { GeneralApi, GeneralApiImpl, IdEntity } from '..';
import useRequest from '@/hook/request';

export interface Tenant extends IdEntity {
  /**
   * 租户名称
   */
  tenantName: string;

  /**
   * 创建时间
   */
  createdTime: Date;

  /**
   * 创建人
   */
  createdBy: string;

  /**
   * 更新时间
   */
  updatedTime: Date;

  /**
   * 更新人
   */
  updatedBy: string;
}

export interface TenantApi extends GeneralApi<Tenant> {}

export default function useTenantApi(): TenantApi {
  const request = useRequest();
  return new GeneralApiImpl<Tenant>('/api/sys/tenant', request);
}
