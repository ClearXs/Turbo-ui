import { Tenant } from '@/api/system/tenant';
import TableCrud from '@/components/table-crud';
import TenantHelper from './helper';
import { observer } from 'mobx-react';

const TenantPage = () => {
  return (
    <TableCrud<Tenant>
      mode="page"
      columns={TenantHelper.getColumns()}
      useApi={TenantHelper.getApi}
    />
  );
};

export default observer(TenantPage);
