import { Post } from '@/api/system/post';
import TableCrud from '@/components/table-crud';
import PostHelper from './helper';

const Post = () => {
  return (
    <TableCrud<Post>
      mode="page"
      useApi={PostHelper.getApi}
      columns={PostHelper.getColumns()}
    />
  );
};

export default Post;
