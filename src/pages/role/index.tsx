import { useMemo } from 'react';
import useRoleApi, { Role } from '@/api/role';
import TableCrud from '@/components/TableCrud';
import {
  OperateToolbar,
  TableColumnProps,
} from '@/components/TableCrud/TableCrud';

const Role: React.FC = () => {
  const roleColumns: TableColumnProps<Role>[] = useMemo(() => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        title: '角色编码',
        dataIndex: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '角色描述',
        dataIndex: 'des',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
      },
      {
        title: '排序',
        dataIndex: 'sort',
        ellipsis: true,
        align: 'center',
        type: 'number',
        defaultValue: 0,
      },
    ];
  }, []);

  return (
    <TableCrud<Role>
      model="role"
      columns={roleColumns}
      useApi={useRoleApi}
      page={true}
      operateBar={
        [
          {
            name: '授权',
            type: 'primary',
            size: 'small',
            onClick: (tableContext, record) => {
              console.log(record);
            },
          },
        ] as OperateToolbar<Role>[]
      }
    />
  );
};

export default Role;
