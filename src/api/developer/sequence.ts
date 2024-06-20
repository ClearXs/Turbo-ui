import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, R, TenantEntity } from '..';

export interface Sequence extends TenantEntity {
  /**
   * 业务Key
   */
  key: string;

  /**
   * 业务名称
   */
  name: string;

  /**
   * 初始值
   */
  initialValue: number;

  /**
   * 序号长度
   */
  length: number;

  /**
   * 序号前缀
   */
  prefix: string;

  /**
   * 序号后缀
   */
  suffix: string;

  /**
   * 步长
   */
  step: number;

  /**
   * 生成类型
   */
  genType: string;
}

export interface SequenceApi extends GeneralApi<Sequence> {
  rest: (id: string) => Promise<R<boolean>>;
  generate: (id: string) => Promise<R<string>>;
  generateList: (id: string, count: number) => Promise<R<string[]>>;
}

class SequenceImpl extends GeneralApiImpl<Sequence> implements SequenceApi {
  rest(id: string): Promise<R<boolean>> {
    return this.request
      .get(this.apiPath + `/rest/${id}`)
      .then((res) => res.data);
  }
  generate(id: string): Promise<R<string>> {
    return this.request
      .get(this.apiPath + `/generate/${id}`)
      .then((res) => res.data);
  }
  generateList(id: string, count: number): Promise<R<string[]>> {
    return this.request
      .get(this.apiPath + `/batch-generate/${id}?count=${count}`)
      .then((res) => res.data);
  }
}

export default function useSequenceApi(): SequenceApi {
  const request = useRequest();
  return new SequenceImpl('/api/dev/sequence', request);
}
