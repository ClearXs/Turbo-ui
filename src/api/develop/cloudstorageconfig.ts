import useRequest from '@/hook/request';
import { BaseEntity, GeneralApi, GeneralParams, Pagination, R } from '../api';

export interface CloudStorageConfig extends BaseEntity {
  /**
   * 文件名称
   */
  name: string;

  /**
   * 云存储端点
   */
  endpoint: string;

  /**
   * 云存储供应商
   */
  provider: 'MINIO' | 'ALIYUN';

  /**
   * 云存储供应商
   */
  csType: 'OSS' | 'NAS' | 'EBS';

  /**
   * 存储空间
   */
  bucket: string;

  /**
   * 访问ID
   */
  accessId: string;

  /**
   * 访问密钥
   */
  accessKey: string;

  /**
   * 是否启用
   */
  enable: 'ENABLE' | 'DISABLE';
}

interface CloudStorageConfigApi extends GeneralApi<CloudStorageConfig> {
  enable: (id: string, enable: 'ENABLE' | 'DISABLE') => Promise<R<boolean>>;
}

export default function useCloudStorageConfigApi(): CloudStorageConfigApi {
  const request = useRequest();
  const save = (entity: CloudStorageConfig): Promise<R<boolean>> => {
    return request
      .post('/api/sys/cloud-storage-config/save', entity)
      .then((res) => {
        return res.data;
      });
  };

  const edit = (entity: CloudStorageConfig): Promise<R<boolean>> => {
    return request
      .put('/api/sys/cloud-storage-config/edit', entity)
      .then((res) => {
        return res.data;
      });
  };

  const saveOrUpdate = (entity: CloudStorageConfig): Promise<R<boolean>> => {
    return request
      .put('/api/sys/cloud-storage-config/save-or-update', entity)
      .then((res) => {
        return res.data;
      });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request
      .delete('/api/sys/cloud-storage-config/delete', ids)
      .then((res) => {
        return res.data;
      });
  };
  const details = (id: string): Promise<R<CloudStorageConfig>> => {
    return request
      .get('/api/sys/cloud-storage-config/details', { id })
      .then((res) => {
        return res.data;
      });
  };

  const list = (
    params: GeneralParams<CloudStorageConfig>,
  ): Promise<R<CloudStorageConfig[]>> => {
    return request
      .post('/api/sys/cloud-storage-config/list', { ...params })
      .then((res) => {
        return res.data;
      });
  };

  const page = (
    page: Pagination<CloudStorageConfig>,
    params: GeneralParams<CloudStorageConfig>,
  ): Promise<R<Pagination<CloudStorageConfig>>> => {
    return request
      .post('/api/sys/cloud-storage-config/page', { page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  const enable = (
    id: string,
    enable: 'ENABLE' | 'DISABLE',
  ): Promise<R<boolean>> => {
    return request
      .put('/api/sys/cloud-storage-config/enable', { id, enable })
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
    enable,
  };
}
