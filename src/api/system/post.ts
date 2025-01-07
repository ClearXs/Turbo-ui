import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export interface Post extends TenantEntity {
  /**
   * 编码
   */
  code: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 描述
   */
  des: string;

  /**
   * 序号
   */
  sort: number;
}

export interface PostApi extends GeneralApi<Post> {}

export class PostApiImpl extends GeneralApiImpl<Post> implements PostApi {}

export default function usePostApi() {
  const request = useRequest();
  return new PostApiImpl('/api/sys/post', request);
}
