import useParamsApi, { Params, ParamsApi } from '@/api/system/params';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/components/interface';

const ParamsHelper: Helper<Params, ParamsApi> = {
  getColumns: () => {
    return [
      {
        label: '参数名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '参数key',
        field: 'key',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '参数值',
        field: 'sort',
        ellipsis: true,
        align: 'center',
        type: 'input',
      },
      {
        label: '参数描述',
        field: 'des',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        line: true,
      },
    ] as TableColumnProps<Params>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
  getApi: useParamsApi,
};

export default ParamsHelper;
