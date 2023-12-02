import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '../interface';

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

class PostApiImpl extends GeneralApiImpl<Post> {}

export default function usePostApi(): GeneralApi<Post> {
  const request = useRequest();
  return new PostApiImpl('/api/sys/post', request);
}
