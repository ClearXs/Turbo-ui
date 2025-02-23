import useCategoryApi, {
  CategoryApi,
  CategoryTree,
} from '@/api/system/category';
import useReaction from '@/components/uni-form/formily/reaction';
import { TableColumnProps } from '@/components/table-crud/interface';
import { Helper } from '@/components/interface';

const CategoryHelper: Helper<CategoryTree, CategoryApi> = {
  getColumns: () => {
    const reaction = useReaction();
    return [
      {
        label: '分类名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '分类编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
        reaction: reaction.setWord('code', ['name'], 'pinyin'),
      },
      {
        label: '分类排序',
        field: 'sort',
        ellipsis: true,
        align: 'center',
        type: 'number',
        table: false,
        initValue: 0,
      },
      {
        label: '功能标识',
        field: 'funcCode',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        table: false,
        form: false,
      },
    ] as TableColumnProps<CategoryTree>[];
  },
  getApi: useCategoryApi,
};

export default CategoryHelper;
