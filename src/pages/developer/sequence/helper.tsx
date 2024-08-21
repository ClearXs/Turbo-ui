import useSequenceApi, {
  Sequence,
  SequenceApi,
} from '@/api/developer/sequence';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';
import swiftGenType from '@/constant/swiftGenType';

const SequenceHelper: Helper<Sequence, SequenceApi> = {
  getColumns: () => {
    return [
      {
        field: 'key',
        label: '业务key',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        field: 'name',
        label: '业务名称',
        ellipsis: true,
        align: 'center',
        type: 'input',
        search: true,
        require: true,
      },
      {
        field: 'genType',
        label: '生成类型',
        ellipsis: true,
        align: 'center',
        type: 'select',
        require: true,
        optionList: swiftGenType,
        initValue: 'ALWAYS',
      },
      {
        field: 'initialValue',
        label: '初始值',
        ellipsis: true,
        align: 'center',
        type: 'number',
        initValue: 0,
      },
      {
        field: 'length',
        label: '序号长度',
        ellipsis: true,
        align: 'center',
        type: 'number',
        initValue: 4,
        extraText: '生成的长度, 超出范围将会至空',
      },
      {
        field: 'prefix',
        label: '序号前缀',
        ellipsis: true,
        align: 'center',
        type: 'input',
        extraText: '在序号前方增加该前缀, 比如 "a1" "a2"',
      },
      {
        field: 'suffix',
        label: '序号后缀',
        ellipsis: true,
        align: 'center',
        type: 'input',
        extraText: '在序号前方增加该前缀, 比如 "b1" "b2"',
      },
      {
        field: 'step',
        label: '步长',
        ellipsis: true,
        align: 'center',
        type: 'number',
        initValue: 1,
        extraText: '序号递增数量',
      },
    ] as TableColumnProps<Sequence>[];
  },
  getApi: useSequenceApi,
};
export default SequenceHelper;
