import { IdEntity } from '@/api';
import { FormCodeEditorColumnProps } from '@/components/TForm/components/CodeEditor';

// cod editor
export type TableCodeEditorColumnProps<T extends IdEntity> =
  FormCodeEditorColumnProps<T> & {};
