import useRequest from '@/hook/useRequest';
import { Tree, TreeGeneralApi, TreeGeneralApiImpl } from '..';

export interface BoAttributeTree extends Tree {
  /**
   * 业务对象属性名称
   */
  name: string;

  /**
   * 业务对象属性编码
   */
  code: string;

  /**
   * 业务对象属性类型
   */
  attrType: 'table' | 'field';

  /**
   * 业务对象属性字段
   */
  field: string;

  /**
   * 业务对象属性备注
   */
  remark: string;

  /**
   * 所属于业务对象表ID
   */
  boId: string;

  /**
   * 业务对象属性类型
   */
  type: string;

  /**
   * 业务对象属性长度
   */
  precision: number;

  /**
   * 业务对象属性小数位
   */
  scala: number;

  /**
   * 是否主键
   */
  isPk: boolean;

  /**
   * 业务对象属性小数位
   */
  isFk: boolean;

  /**
   * 业务对象属性小数位
   */
  isNonNull: boolean;

  /**
   * 业务对象属性小数位
   */
  isUnique: boolean;
}

export interface BoAttributeApi extends TreeGeneralApi<BoAttributeTree> {}

class BoAttributeApiImpl
  extends TreeGeneralApiImpl<BoAttributeTree>
  implements BoAttributeApi {}

export default function useBoAttributeApi(): BoAttributeApi {
  const request = useRequest();
  return new BoAttributeApiImpl('/api/dev/bo/attribute', request);
}
