import { Tenant } from '@/api/system/tenant';
import TableCrud from '@/components/TableCrud';
import TenantHelper from './helper';

const Tenant: React.FC = () => {
  return (
    <TableCrud<Tenant>
      mode="page"
      columns={TenantHelper.getColumns()}
      useApi={TenantHelper.getApi}
    />
  );
};

export default Tenant;
