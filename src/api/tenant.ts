import { R } from './api';
import useRequest from '@/hook/request';

export type Tenant = {
  /**
   * 主键
   */
  tenantId: string;

  /**
   * 角色名称
   */
  tenantName: string;

  /**
   * 创建时间
   */
  createdTime: Date;

  /**
   * 创建人
   */
  createdBy: number;

  /**
   * 更新时间
   */
  updatedTime: Date;

  /**
   * 更新人
   */
  updatedBy: number;
};

export type TenantParams = {
  /**
   * 主键
   */
  tenantId?: string;

  /**
   * 角色名称
   */
  tenantName?: string;
};

export default function useTenantApi() {
  const request = useRequest();

  const list = (params: TenantParams = {}): Promise<R<Tenant[]>> => {
    return request.get('/api/sys/tenant/list', params).then((res) => {
      return res.data || ({} as R<Tenant>);
    });
  };

  return { list };
}
