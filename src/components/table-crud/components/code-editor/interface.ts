import { Entity } from '@/api';
import { FormCodeEditorColumnProps } from '@/components/tform/components';

// cod editor
export type TableCodeEditorColumnProps<T extends Entity> =
  FormCodeEditorColumnProps<T>;
