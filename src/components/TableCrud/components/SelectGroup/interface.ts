import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import { FormSelectGroupColumnProps } from '@/components/TForm/components';

// Select Group 组件
export type TableSelectGroupColumnProps<T extends IdEntity> =
  CardColumnProps<T> & FormSelectGroupColumnProps<T> & {};
