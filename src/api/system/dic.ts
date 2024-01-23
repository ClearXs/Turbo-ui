import useRequest from '@/hook/request';
import { Tree, TreeGeneralApi, TreeGeneralApiImpl } from '../interface';
import { Constant } from '@/constant/interface';
import { TagColor } from '@douyinfe/semi-ui/lib/es/tag';

export interface Dic extends Tree {
  /**
   * 字典类型
   */
  type: 'SYSTEM' | 'BIZ';

  /**
   * 字典编码
   */
  code: string;

  /**
   * 字典名称
   */
  name: string;

  /**
   * 字典描述
   */
  des: string;

  /**
   * 字典排序
   */
  sort: number;

  /**
   * 颜色
   */
  color: string;
}

export interface DicApi extends TreeGeneralApi<Dic> {}

export default function useDicApi(): DicApi {
  const request = useRequest();
  return new TreeGeneralApiImpl<Dic>('/api/sys/dic', request);
}

export const format = (dics: Dic[]): Constant[] => {
  return dics.map((dic) => {
    return {
      value: dic.code,
      label: dic.name,
      tag: dic.color as TagColor,
    };
  });
};
