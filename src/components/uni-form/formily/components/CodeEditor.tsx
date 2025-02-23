import TurboCodeEditor from '@/components/code-editor/CodeEditor';
import { connect, mapProps } from '@formily/react';

export const CodeEditor = connect(
  TurboCodeEditor,
  mapProps({
    value: 'value',
    onInput: 'onChange',
  }),
);

export default CodeEditor;
