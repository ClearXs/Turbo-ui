import useRequest, { InternalRequest } from '@/hook/useRequest';
import {
  GeneralApi,
  GeneralApiImpl,
  GeneralParams,
  Pagination,
  R,
  TenantEntity,
  Tree,
} from '..';
import _ from 'lodash';

// domain
export type DomainEntity = Record<string, any> & Tree & TenantEntity;

export interface DomainApi extends GeneralApi<DomainEntity> {}

class DomainApiImpl extends GeneralApiImpl<DomainEntity> implements DomainApi {
  constructor(
    protected apiPath: string,
    protected request: InternalRequest,
    private boId: string,
  ) {
    super(apiPath, request);
  }

  save(entity: DomainEntity): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + `/save/${this.boId}`, entity)
      .then((res) => {
        return res.data;
      });
  }

  edit(entity: DomainEntity): Promise<R<boolean>> {
    return this.request
      .put(this.apiPath + `/edit/${this.boId}`, entity)
      .then((res) => {
        return res.data;
      });
  }

  saveOrUpdate(entity: DomainEntity): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + `/save-or-update/${this.boId}`, entity)
      .then((res) => {
        return res.data;
      });
  }

  batchSaveOrUpdate(entity: DomainEntity[]): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + `/batch-save-or-update/${this.boId}`, entity)
      .then((res) => {
        return res.data;
      });
  }

  deleteEntity(ids: string[]): Promise<R<boolean>> {
    return this.request
      .delete(this.apiPath + `/delete/${this.boId}`, ids)
      .then((res) => {
        return res.data;
      });
  }

  details(id: string): Promise<R<DomainEntity & { [key: string]: any }>> {
    return this.request
      .get(this.apiPath + `/details/${this.boId}/${id}`)
      .then((res) => {
        return res.data;
      });
  }

  /**
   * 导入
   * @param id id
   * @returns true or false
   */
  import(file: any): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + `/import/${this.boId}`, { file })
      .then((res) => {
        return res.data;
      });
  }

  /**
   * 导出
   * @param id id
   * @returns 实体 or null
   */
  export(params?: GeneralParams<DomainEntity>): Promise<any> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request.post(this.apiPath + `/export/${this.boId}`, {
      ...queryParam,
    });
  }

  list(params?: GeneralParams<DomainEntity>): Promise<R<DomainEntity[]>> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request
      .post(this.apiPath + `/list/${this.boId}`, { ...queryParam })
      .then((res) => {
        return res.data;
      });
  }
  page(
    page: Pagination<DomainEntity>,
    params?: GeneralParams<DomainEntity>,
  ): Promise<R<Pagination<DomainEntity>>> {
    const queryParam = this.buildRemoteQueryParam(params);
    return this.request
      .post(this.apiPath + `/page/${this.boId}`, { page, ...queryParam })
      .then((res) => {
        return res.data;
      });
  }
}

export default function useDomainApi(boId: string): DomainApi {
  const request = useRequest();
  return new DomainApiImpl('/api/dev/bo/domain', request, boId);
}
