import useRequest from '@/hook/request';
import {
  CategoryEntity,
  GeneralApi,
  GeneralApiImpl,
  R,
  TenantEntity,
} from '../interface';
import { BoSchema } from '@designable/core';

export interface Bo extends TenantEntity, CategoryEntity {
  /**
   * 业务对象名称
   */
  name: string;

  /**
   * 业务对象编码
   */
  code: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 数据源id
   */
  dataSourceId: string;
}

export interface BoApi extends GeneralApi<Bo> {
  /**
   * 获取bo schema
   */
  schema: (boId: string) => Promise<R<BoSchema>>;
}

class BoApiImpl extends GeneralApiImpl<Bo> implements BoApi {
  schema(boId: string): Promise<R<BoSchema>> {
    return this.request.get(this.apiPath + `/schema/${boId}`).then((res) => {
      return res.data;
    });
  }
}

export default function useBoApi(): BoApi {
  const request = useRequest();
  return new BoApiImpl('/api/dev/bo', request);
}