import useRequest from '@/hook/request';
import { BaseEntity, GeneralApi, GeneralApiImpl, R } from '../interface';

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

export interface CloudStorageConfigApi extends GeneralApi<CloudStorageConfig> {
  enable: (id: string) => Promise<R<boolean>>;
  disable: (id: string) => Promise<R<boolean>>;
}

class CloudStorageConfigApiImpl
  extends GeneralApiImpl<CloudStorageConfig>
  implements CloudStorageConfigApi
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

export default function useCloudStorageConfigApi(): CloudStorageConfigApi {
  const request = useRequest();
  return new CloudStorageConfigApiImpl(
    '/api/sys/cloud-storage-config',
    request,
  );
}
