import useDatasetApi, { Dataset, DatasetApi } from '@/api/developer/dataset';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import { DatasetSource } from './source';
import useReaction from '@/components/tform/formily/reaction';

const DatasetHelper: Helper<Dataset, DatasetApi> = {
  getColumns: () => {
    const reaction = useReaction();

    return [
      {
        label: '数据集名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '数据集编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
      },
      {
        label: '来源类型',
        field: 'source',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        optionList: DatasetSource,
      },
      {
        label: '来源',
        field: 'sourceId',
        ellipsis: true,
        align: 'center',
        type: 'select',
        reaction: {
          dependencies: ['source'],
          fulfill: {
            schema: {
              'x-visible': "{{$deps[0] === 'bo'}}",
            },
          },
        },
      },
    ] as TableColumnProps<Dataset>[];
  },
  getApi: useDatasetApi,
};

export default DatasetHelper;
