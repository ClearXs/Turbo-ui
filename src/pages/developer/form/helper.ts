import { Form } from '@/api/developer/form';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/pages/interface';

const FormHelper: Helper<Form> = {
  getColumns: () => {
    return [
      {
        label: '表单名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '表单编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '表单数据',
        field: 'form',
        ellipsis: true,
        align: 'center',
        type: 'input',
        table: false,
        form: false,
      },
      {
        label: '业务对象',
        field: 'boId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        remote: {
          url: '/api/dev/bo/list',
        },
      },
      {
        label: '备注',
        field: 'remark',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        line: true,
      },
    ] as TableColumnProps<Form>[];
  },
};

export default FormHelper;
