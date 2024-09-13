import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { CodeEditorProps } from '@/components/code-editor';

// code editor
export type FormCodeEditorColumnProps<T extends Entity> = FormColumnProps<T> &
  Pick<CodeEditorProps, 'language' | 'completion' | 'basicSetup'>;
