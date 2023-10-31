import { get } from '@/util/request';
import { Tenant, TenantParams } from './tenant.interface';
import { R } from './api.interface';

export function list(params: TenantParams = {}): Promise<R<Tenant[]>> {
  return get('/api/sys/tenant/list', params).then((res) => {
    return res.data || ({} as R<Tenant>);
  });
}
