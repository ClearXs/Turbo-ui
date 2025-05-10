import { Entity } from '@/api';
import { FormCodeEditorColumnProps } from '@/components/uni-form/components';

// cod editor
export type TableCodeEditorColumnProps<T extends Entity> =
  FormCodeEditorColumnProps<T>;
