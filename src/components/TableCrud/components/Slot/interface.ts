import { IdEntity } from '@/api';
import { FormSlotColumnProps } from '@/components/TForm/components';

// slot
export type TableSlotColumnProps<T extends IdEntity> = FormSlotColumnProps<T>;
