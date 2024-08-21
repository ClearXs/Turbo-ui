import { IdEntity } from '@/api';
import { FormCodeEditorColumnProps } from '@/components/tform/components/CodeEditor';

// cod editor
export type TableCodeEditorColumnProps<T extends IdEntity> =
  FormCodeEditorColumnProps<T> & {};
