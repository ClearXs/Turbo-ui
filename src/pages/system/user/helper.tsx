import { User } from '@/api/system/user';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { USER_STATUS } from '@/constant/userstatus';
import { Helper } from '@/pages/interface';

const UserHelper: Helper<User> = {
  getColumns: () => {
    return [
      {
        label: '用户名',
        field: 'username',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '密码',
        field: 'password',
        ellipsis: true,
        align: 'center',
        type: 'input',
        table: false,
        require: true,
        form: (formContext) => {
          return formContext?.type === 'add';
        },
      },
      {
        label: '邮箱',
        field: 'email',
        type: 'input',
        ellipsis: true,
        align: 'center',
      },
      {
        label: '昵称',
        field: 'nickname',
        type: 'input',
        ellipsis: true,
        align: 'center',
      },
      {
        label: '电话号码',
        field: 'phone',
        type: 'input',
        ellipsis: true,
        align: 'center',
      },
      {
        label: '用户状态',
        field: 'status',
        type: 'select',
        ellipsis: true,
        align: 'center',
        form: false,
        optionList: USER_STATUS,
      },
    ] as TableColumnProps<User>[];
  },
};

export default UserHelper;
