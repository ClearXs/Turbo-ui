import ListPanel from '@/components/list';
import { useEffect, useState } from 'react';
import { ListPanelProps } from '@/components/list/interface';
import useUserPosteApi from '@/api/system/userpost';
import PostHelper from './helper';
import usePostApi, { Post } from '@/api/system/post';

export type PostListProps = {
  userId?: string;
  getListPanelApi?: ListPanelProps<Post>['getListPanelApi'];
};

const PostList: React.FC<PostListProps> = (props: PostListProps) => {
  const userPostApi = useUserPosteApi();
  const [postIds, setPostIds] = useState<string[]>([]);

  useEffect(() => {
    const { userId } = props;
    if (userId) {
      userPostApi.list({ entity: { userId } }).then((res) => {
        if (res.code === 200) {
          setPostIds(res.data.map((r) => r.postId));
        }
      });
    }
  }, [props.userId]);

  return (
    <ListPanel<Post>
      columns={PostHelper.getColumns()}
      useApi={usePostApi}
      wrap={PostHelper.wrap}
      initValues={postIds}
      multiple
      toolbar={{ showAdd: false }}
      operateBar={{ showEdit: false, showDelete: false }}
      getListPanelApi={(api) => {
        props.getListPanelApi?.(api);
      }}
    />
  );
};

export default PostList;
