import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormIconColumnProps } from '@/components/tform/components';

// icon
export type TableIconColumnProps<T extends Entity> = CardColumnProps<T> &
  FormIconColumnProps<T>;
