import usePageApi, { Page, PageApi } from '@/api/developer/page';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';
import BoHelper from '../bo/helper';
import FormHelper from '../form/helper';
import MenuHelper from '@/pages/system/menu/helper';
import useReaction from '@/components/TForm/formily/reaction';

const PageHelper: Helper<Page, PageApi> = {
  getColumns: () => {
    const reaction = useReaction();
    return [
      {
        label: '页面名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '页面编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
      },
      {
        label: '表单',
        field: 'formId',
        ellipsis: true,
        type: 'select',
        remote: {
          url: '/api/dev/form/list',
        },
        showClear: true,
        relation: {
          helper: FormHelper,
        },
      },
      {
        label: '业务对象',
        field: 'boId',
        ellipsis: true,
        type: 'select',
        remote: {
          url: '/api/dev/bo/list',
        },
        disabled: true,
        showClear: true,
        relation: {
          helper: BoHelper,
        },
      },
      {
        label: '数据视图',
        field: 'route',
        ellipsis: true,
        align: 'center',
        type: 'select',
        disabled: true,
        remote: {
          url: '/api/sys/menu/list',
        },
        relation: {
          helper: MenuHelper,
        },
      },
      {
        label: '页面路由',
        field: 'route',
        ellipsis: true,
        align: 'center',
        type: 'input',
        disabled: true,
      },
    ] as TableColumnProps<Page>[];
  },
  getApi: usePageApi,
};

export default PageHelper;
