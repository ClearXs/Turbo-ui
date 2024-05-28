import { IdEntity } from '@/api';
import { FormColumnProps } from '../../interface';
import { CodeEditorProps } from '@/components/CodeEditor';

// code editor
export type FormCodeEditorColumnProps<T extends IdEntity> = FormColumnProps<T> &
  Pick<CodeEditorProps, 'language' | 'completion' | 'basicSetup'>;
