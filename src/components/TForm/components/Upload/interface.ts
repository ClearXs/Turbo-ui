import { IdEntity } from '@/api/interface';
import { FormColumnProps } from '../../interface';
import { UploadProps } from '@douyinfe/semi-ui/lib/es/upload';

// upload
export type FormUploadProps<T extends IdEntity> = FormColumnProps<T> &
  UploadProps & {};

// upload drag
export type FormUploadDragColumnProps<T extends IdEntity> = FormColumnProps<T> &
  UploadProps & {};
