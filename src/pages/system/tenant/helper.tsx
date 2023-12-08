import { Tenant } from '@/api/system/tenant';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/pages/interface';

const TenantHelper: Helper<Tenant> = {
  getColumns: () => {
    return [
      {
        field: 'tenantName',
        label: '租户名称',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        field: 'createdTime',
        label: '创建时间',
        ellipsis: true,
        align: 'center',
        type: 'date',
        search: true,
        form: false,
      },
      {
        field: 'createdBy',
        label: '创建人',
        ellipsis: true,
        align: 'center',
        type: 'input',
        form: false,
      },
      {
        field: 'createdBy',
        label: '创建人',
        ellipsis: true,
        align: 'center',
        type: 'input',
        form: false,
      },
      {
        field: 'updatedTime',
        label: '更新时间',
        ellipsis: true,
        align: 'center',
        type: 'input',
        form: false,
      },
      {
        field: 'updatedBy',
        label: '创建人',
        ellipsis: true,
        align: 'center',
        type: 'input',
        form: false,
      },
    ] as TableColumnProps<Tenant>[];
  },
};
export default TenantHelper;
