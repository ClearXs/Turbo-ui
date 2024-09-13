import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import {
  FormUploadDragProps,
  FormUploadProps,
} from '@/components/tform/components';

// upload
export type TableUploadColumnProps<T extends Entity> = CardColumnProps<T> &
  FormUploadProps<T>;

// upload drag
export type TableUploadDragColumnProps<T extends Entity> = CardColumnProps<T> &
  FormUploadDragProps<T>;
