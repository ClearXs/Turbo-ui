import useRequest from '@/hook/request';
import { Tree, TreeGeneralApi, TreeGeneralApiImpl } from '../interface';

export interface Category extends Tree {
  /**
   * 分类名称
   */
  name: string;

  /**
   * 分类编码
   */
  code: string;

  /**
   * 分类排序
   */
  sort: number;

  /**
   * 功能标识
   */
  funcCode: string;
}

export type CategoryTree = Category & {
  children: CategoryTree[];
};

export default function useCategoryApi(): TreeGeneralApi<CategoryTree> {
  const request = useRequest();
  return new TreeGeneralApiImpl<CategoryTree>('/api/sys/category', request);
}
