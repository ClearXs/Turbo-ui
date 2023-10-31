import { list } from '@/api/tenant';
import { Tenant, TenantParams } from '@/api/tenant.interface';
import { selectorFamily, useRecoilValue } from 'recoil';

const namespace = 'tenant';

export const tenantListQuery = selectorFamily({
  key: `${namespace}:list:query`,
  get: (params: TenantParams) => async () => {
    const res = await list(params);
    return res.data || [];
  },
});

export const queryTenantList = (params: TenantParams = {}): Tenant[] => {
  return useRecoilValue(tenantListQuery(params)) || [];
};
