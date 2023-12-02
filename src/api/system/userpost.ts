import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, IdEntity } from '../interface';

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

const useUserPosteApi = (): GeneralApi<UserPost> => {
  const request = useRequest();

  return new GeneralApiImpl<UserPost>('/api/sys/user-post', request);
};

export default useUserPosteApi;
