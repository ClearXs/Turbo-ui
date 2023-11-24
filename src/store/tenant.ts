import TenantApi, { Tenant, TenantParams } from '@/api/system/tenant';
import { atom, atomFamily, selectorFamily, useRecoilValue } from 'recoil';

const namespace = 'tenant';

export const tenantIdState = atomFamily({
  key: `${namespace}:signle`,
  default: '',
});

export const tenantState = atom({
  key: `${namespace}:tenant:list`,
  default: async (params: TenantParams) => {
    const res = await TenantApi().list(params);
    return res.data || [];
  },
});

export const tenantListQuery = selectorFamily({
  key: `${namespace}:list:query`,
  get: (params: TenantParams) => async () => {
    const res = await TenantApi().list(params);
    return res.data || [];
  },
});

export const queryTenantList = (params: TenantParams = {}): Tenant[] => {
  return useRecoilValue(tenantListQuery(params)) || [];
};
