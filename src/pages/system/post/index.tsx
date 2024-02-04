import { Post } from '@/api/system/post';
import TableCrud from '@/components/TableCrud';
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
