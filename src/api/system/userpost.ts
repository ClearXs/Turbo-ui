import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, IdEntity } from '..';

export interface UserPost extends IdEntity {
  /**
   * 用户id
   */
  userId: number;

  /**
   * 岗位id
   */
  postId: number;
}

interface UserPostApi extends GeneralApi<UserPost> {}

const useUserPosteApi = (): UserPostApi => {
  const request = useRequest();

  return new GeneralApiImpl<UserPost>('/api/sys/user-post', request);
};

export default useUserPosteApi;
