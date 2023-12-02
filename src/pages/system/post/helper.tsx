import { Post } from '@/api/system/post';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { Helper } from '@/pages/interface';

const PostHelper: Helper<Post> = {
  getColumns: () => {
    return [
      {
        label: '岗位名称',
        field: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        label: '岗位编码',
        field: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        label: '岗位序号',
        field: 'sort',
        ellipsis: true,
        align: 'center',
        type: 'number',
      },
      {
        label: '岗位描述',
        field: 'des',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        form: true,
        line: true,
      },
    ] as TableColumnProps<Post>[];
  },

  wrap: (entity) => {
    return {
      key: entity.id,
      value: entity.id,
      label: entity.name,
    };
  },
};

export default PostHelper;
