import useRequest from '@/hook/request';
import {
  CategoryEntity,
  GeneralApi,
  GeneralApiImpl,
  TenantEntity,
} from '../interface';

export interface Dataset extends TenantEntity, CategoryEntity {
  /**
   * 数据集名称
   */
  name: string;

  /**
   * 数据集编码
   */
  code: string;

  /**
   * 来源
   */
  source: string;

  /**
   * 来源id
   */
  sourceId: string;

  /**
   * 配置信息
   */
  advanced: string;

  /**
   * 分类id
   */
  categoryId: string;
}

export interface DatasetApi extends GeneralApi<Dataset> {}

class DatasetApiImpl extends GeneralApiImpl<Dataset> implements DatesetApi {}

export default function useDatasetApi(): DatasetApi {
  const request = useRequest();
  return new DatasetApiImpl('/api/dev/dataset', request);
}
