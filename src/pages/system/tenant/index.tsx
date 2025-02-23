import { Tenant } from '@/api/system/tenant';
import TableCrud from '@/components/table-crud';
import TenantHelper from './helper';

const TenantPage = () => {
  const tenantApi = TenantHelper.getApi();

  return (
    <TableCrud<Tenant>
      mode="page"
      columns={TenantHelper.getColumns()}
      useApi={tenantApi}
    />
  );
};

export default TenantPage;
