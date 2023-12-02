import usePostApi, { Post } from '@/api/system/post';
import TableCrud from '@/components/TableCrud';
import PostHelper from './helper';

const Post = () => {
  return (
    <TableCrud<Post>
      model="page"
      useApi={usePostApi}
      columns={PostHelper.getColumns()}
    />
  );
};

export default Post;
