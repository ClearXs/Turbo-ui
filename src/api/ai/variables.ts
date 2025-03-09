import useRequest from '@/hook/useRequest';
import { GeneralApi, GeneralApiImpl, TenantEntity } from '..';

export interface Variables extends TenantEntity {
  /**
   * Key
   */
  key: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 类型
   */
  type: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 值
   */
  value: string;
}

export interface VariablesApi extends GeneralApi<Variables> {}

class VariablesApiImpl
  extends GeneralApiImpl<Variables>
  implements VariablesApi {}

export default function useVariablesApi(): VariablesApi {
  const request = useRequest();
  return new VariablesApiImpl('/api/ai/chat', request);
}
