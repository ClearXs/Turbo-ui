import { Tree, TreeGeneralApi, TreeGeneralApiImpl } from '..';
import useRequest from '@/hook/useRequest';

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

export interface OrgApi extends TreeGeneralApi<Org> {}

export default function useOrgApi() {
  const request = useRequest();
  return new TreeGeneralApiImpl<Org>('/api/sys/org', request);
}
