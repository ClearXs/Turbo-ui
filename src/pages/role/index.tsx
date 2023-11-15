import { useMemo } from 'react';
import useRoleApi, { Role } from '@/api/role';
import TableCrud from '@/components/TableCrud';
import { OpearteToolbar } from '@/components/TableCrud/TableCrud';

const Role: React.FC = () => {
  const roleColumns = useMemo(() => {
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
      columns={roleColumns}
      useApi={useRoleApi}
      page={true}
      opearteBar={
        [
          {
            name: '授权',
            type: 'primary',
            size: 'small',
            onClick: (tableContext, record) => {
              console.log(record);
            },
          },
        ] as OpearteToolbar<Role>[]
      }
    />
  );
};

export default Role;
