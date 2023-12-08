import useAuthApi from '@/api/system/auth';
import { Post } from '@/api/system/post';
import { Card, CardGroup } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { useEffect, useState } from 'react';

const MyPost = () => {
  const authApi = useAuthApi();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    authApi.currentUserPost().then((res) => {
      const { code, data } = res;
      if (code === 200) {
        setPosts(data);
      }
    });
  }, []);

  return (
    <>
      <CardGroup spacing={50} className="p-5">
        {posts.map((post) => {
          return (
            <Card
              key={post.id}
              shadows="hover"
              title={post.name}
              headerLine={false}
              className="w-56"
            >
              <Text>{post.des}</Text>
            </Card>
          );
        })}
      </CardGroup>
    </>
  );
};

export default MyPost;
