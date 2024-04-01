import useRequest from '@/hook/request';
import {
  CategoryEntity,
  GeneralApi,
  GeneralApiImpl,
  R,
  TenantEntity,
} from '..';
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
  check: (boId: string) => Promise<R<boolean>>;
  /**
   * 获取bo schema
   */
  schema: (boId: string) => Promise<R<BoSchema>>;

  /**
   * 保存bo schema
   * @param boSchema bo schema
   * @returns
   */
  saveSchema: (boSchema: BoSchema) => Promise<R<boolean>>;

  /**
   * 物化
   * @param boId bo id
   * @returns true if success
   */
  materialize: (boId: string) => Promise<R<boolean>>;
}

class BoApiImpl extends GeneralApiImpl<Bo> implements BoApi {
  check(boId: string): Promise<R<boolean>> {
    return this.request.get(this.apiPath + `/check/${boId}`).then((res) => {
      return res.data;
    });
  }
  materialize(boId: string): Promise<R<boolean>> {
    return this.request
      .get(this.apiPath + `/materialize/${boId}`)
      .then((res) => {
        return res.data;
      });
  }
  schema(boId: string): Promise<R<BoSchema>> {
    return this.request.get(this.apiPath + `/schema/${boId}`).then((res) => {
      return res.data;
    });
  }
  saveSchema(boSchema: BoSchema): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + '/save-schema', boSchema)
      .then((res) => {
        return res.data;
      });
  }
}

export default function useBoApi(): BoApi {
  const request = useRequest();
  return new BoApiImpl('/api/dev/bo', request);
}
