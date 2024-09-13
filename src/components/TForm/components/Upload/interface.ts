import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { UploadProps } from '@douyinfe/semi-ui/lib/es/upload';

// upload
export type FormUploadProps<T extends Entity> = FormColumnProps<T> &
  UploadProps;

// upload drag
export type FormUploadDragProps<T extends Entity> = FormColumnProps<T> &
  UploadProps;
