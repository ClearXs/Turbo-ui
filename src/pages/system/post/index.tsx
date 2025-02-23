import { Post } from '@/api/system/post';
import TableCrud from '@/components/table-crud';
import PostHelper from './helper';

const PostPage = () => {
  const postApi = PostHelper.getApi();
  return (
    <TableCrud<Post>
      mode="page"
      useApi={postApi}
      columns={PostHelper.getColumns()}
    />
  );
};

export default PostPage;
