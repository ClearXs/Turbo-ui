import { CategoryTree } from '@/api/system/category';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/pages/interface';

const CategoryHelper: Helper<CategoryTree> = {
  getColumns: () => {
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
      },
      {
        label: '分类排序',
        field: 'sort',
        ellipsis: true,
        align: 'center',
        type: 'number',
        table: false,
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
};

export default CategoryHelper;
