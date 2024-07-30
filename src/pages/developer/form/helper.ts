import useFormApi, { Form, FormApi } from '@/api/developer/form';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';
import BoHelper from '../bo/helper';
import useReaction from '@/components/TForm/formily/reaction';

const FormHelper: Helper<Form, FormApi> = {
  getColumns: () => {
    const reaction = useReaction();
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
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
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
        relation: {
          helper: BoHelper,
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
  getApi: useFormApi,
};

export default FormHelper;
