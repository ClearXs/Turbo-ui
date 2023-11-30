import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, R, TenantEntity } from '../interface';

export interface Attachment extends TenantEntity {
  /**
   * 文件名称
   */
  filename: string;

  /**
   * 文件地址
   */
  filepath: string;

  /**
   * 云存储供应商
   */
  provider: 'MINIO' | 'ALIYUN';
}

interface AttachmentApi extends GeneralApi<Attachment> {
  upload: (file: any) => Promise<R<Attachment>>;
  download: (filename: string) => Promise<R<any>>;
}

class AttachmentApiImpl
  extends GeneralApiImpl<Attachment>
  implements AttachmentApi
{
  upload(file: any): Promise<R<Attachment>> {
    return this.request.post(this.apiPath + '/upload', file).then((res) => {
      return res.data;
    });
  }
  download(filename: string): Promise<R<any>> {
    return this.request
      .get(`${this.apiPath}/download/${filename}`)
      .then((res) => {
        return res.data;
      });
  }
}

export default function useAttachmentApi(): AttachmentApi {
  const request = useRequest();
  return new AttachmentApiImpl('/api/sys/attachment', request);
}
