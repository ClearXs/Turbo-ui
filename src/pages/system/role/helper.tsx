import useRoleApi, { Role, RoleApi } from '@/api/system/role';
import useReaction from '@/components/TForm/formily/reaction';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';

const RoleHelper: Helper<Role, RoleApi> = {
  getColumns: () => {
    const reaction = useReaction();
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
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
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
  getApi: useRoleApi,
};

export default RoleHelper;
