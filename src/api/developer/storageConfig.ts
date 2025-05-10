import useRequest from '@/hook/useRequest';
import { BaseEntity, GeneralApi, GeneralApiImpl, R } from '..';

export interface StorageConfig extends BaseEntity {
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
  accessKey: string;

  /**
   * 访问密钥
   */
  secretKey: string;

  /**
   * 是否启用
   */
  enable: 'ENABLE' | 'DISABLE';
}

export interface StorageConfigApi extends GeneralApi<StorageConfig> {
  enable: (id: string) => Promise<R<boolean>>;
  disable: (id: string) => Promise<R<boolean>>;
}

class StorageConfigApiImpl
  extends GeneralApiImpl<StorageConfig>
  implements StorageConfigApi
{
  enable(id: string): Promise<R<boolean>> {
    return this.request.put(this.apiPath + `/enable/${id}`).then((res) => {
      return res.data;
    });
  }
  disable(id: string): Promise<R<boolean>> {
    return this.request.put(this.apiPath + `/disable/${id}`).then((res) => {
      return res.data;
    });
  }
}

export default function useStorageConfigApi(): StorageConfigApi {
  const request = useRequest();
  return new StorageConfigApiImpl('/api/sys/storage-config', request);
}
