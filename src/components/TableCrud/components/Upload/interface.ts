import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import {
  FormUploadDragColumnProps,
  FormUploadProps,
} from '@/components/TForm/components';

// upload
export type TableUploadColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormUploadProps<T>;
// upload drag
export type TableUploadDragColumnProps<T extends IdEntity> =
  CardColumnProps<T> & FormUploadDragColumnProps<T>;
