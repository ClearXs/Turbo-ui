import { Post } from '@/api/system/post';
import TableCrud from '@/components/table-crud';
import PostHelper from './helper';
import { observer } from 'mobx-react';

const PostPage = () => {
  return (
    <TableCrud<Post>
      mode="page"
      useApi={PostHelper.getApi}
      columns={PostHelper.getColumns()}
    />
  );
};

export default observer(PostPage);
