import useRequest from '@/hook/request';
import { GeneralApi, GeneralParams, Pagination, R, Tree } from '../api';

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

interface DicApi extends GeneralApi<Dic> {}

export default function useDicApi(): DicApi {
  const request = useRequest();
  const save = (entity: Dic): Promise<R<boolean>> => {
    return request.post('/api/sys/dic/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: Dic): Promise<R<boolean>> => {
    return request.put('/api/sys/dic/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: Dic): Promise<R<boolean>> => {
    return request.put('/api/sys/dic/save-or-update', entity).then((res) => {
      return res.data;
    });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/dic/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<Dic>> => {
    return request.get('/api/sys/dic/details', { id }).then((res) => {
      return res.data;
    });
  };

  const list = (params: GeneralParams<Dic>): Promise<R<Dic[]>> => {
    return request.post('/api/sys/dic/list', { ...params }).then((res) => {
      return res.data;
    });
  };

  const page = (
    page: Pagination<Dic>,
    params: GeneralParams<Dic>,
  ): Promise<R<Pagination<Dic>>> => {
    return request
      .post('/api/sys/dic/page', { page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  return {
    save,
    edit,
    saveOrUpdate,
    deleteEntity,
    details,
    list,
    page,
  };
}
