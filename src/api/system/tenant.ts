import { GeneralApi, GeneralParams, IdEntity, Pagination, R } from '../api';
import useRequest from '@/hook/request';

export interface Tenant extends IdEntity {
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
}

export default function useTenantApi(): GeneralApi<Tenant> {
  const request = useRequest();
  const save = (entity: Tenant): Promise<R<boolean>> => {
    return request.post('/api/sys/tenant/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: Tenant): Promise<R<boolean>> => {
    return request.put('/api/sys/tenant/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: Tenant): Promise<R<boolean>> => {
    return request.put('/api/sys/tenant/save-or-update', entity).then((res) => {
      return res.data;
    });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/tenant/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<Tenant>> => {
    return request.get('/api/sys/tenant/details', { id }).then((res) => {
      return res.data;
    });
  };

  const list = (params: GeneralParams<Tenant>): Promise<R<Tenant[]>> => {
    return request.post('/api/sys/tenant/list', { ...params }).then((res) => {
      return res.data;
    });
  };

  const page = (
    page: Pagination<Tenant>,
    params: GeneralParams<Tenant>,
  ): Promise<R<Pagination<Tenant>>> => {
    return request
      .post('/api/sys/tenant/page', { page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  return { save, edit, saveOrUpdate, deleteEntity, details, list, page };
}
