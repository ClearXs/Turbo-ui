import { Role } from '@/api/system/role';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/pages/interface';

const RoleHelper: Helper<Role> = {
  getColumns: () => {
    return [
      {
        label: '角色名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '角色编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '角色描述',
        field: 'des',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        form: true,
        line: true,
      },
    ] as TableColumnProps<Role>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
};

export default RoleHelper;
