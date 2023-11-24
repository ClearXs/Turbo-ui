import useRequest from '@/hook/request';
import { GeneralApi, GeneralParams, Pagination, R, TenantEntity } from '../api';

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

export default function useAttachmentApi(): AttachmentApi {
  const request = useRequest();
  const save = (entity: Attachment): Promise<R<boolean>> => {
    return request.post('/api/sys/attachment/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: Attachment): Promise<R<boolean>> => {
    return request.put('/api/sys/attachment/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: Attachment): Promise<R<boolean>> => {
    return request
      .put('/api/sys/attachment/save-or-update', entity)
      .then((res) => {
        return res.data;
      });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/attachment/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<Attachment>> => {
    return request.get('/api/sys/attachment/details', { id }).then((res) => {
      return res.data;
    });
  };

  const list = (
    params: GeneralParams<Attachment>,
  ): Promise<R<Attachment[]>> => {
    return request
      .post('/api/sys/attachment/list', { ...params })
      .then((res) => {
        return res.data;
      });
  };

  const page = (
    page: Pagination<Attachment>,
    params: GeneralParams<Attachment>,
  ): Promise<R<Pagination<Attachment>>> => {
    return request
      .post('/api/sys/attachment/page', { page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  const upload = (file: any): Promise<R<Attachment>> => {
    return request.post('/api/sys/attachment/upload', file).then((res) => {
      return res.data;
    });
  };

  const download = (filename: string): Promise<R<any>> => {
    return request
      .get(`/api/sys/attachment/download/${filename}`)
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
    upload,
    download,
  };
}
