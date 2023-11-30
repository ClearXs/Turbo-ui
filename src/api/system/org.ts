import { Tree, TreeGeneralApi, TreeGeneralApiImpl } from '../interface';
import useRequest from '@/hook/request';

export interface Org extends Tree {
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
   * 排序
   */
  sort: number;

  /**
   * 组织类型
   */
  type: string;
}

interface OrgApi extends TreeGeneralApi<Org> {}

export default function useOrgApi(): OrgApi {
  const request = useRequest();
  return new TreeGeneralApiImpl<Org>('/api/sys/org', request);
}
