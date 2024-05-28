import { CodeEditorProps } from './interface';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { mentions } from '@uiw/codemirror-extensions-mentions';

const CodeEditor: React.FC<CodeEditorProps> = ({
  extensions = [],
  completion = [],
  language,
  ...props
}) => {
  return (
    <CodeMirror
      {...props}
      extensions={[...extensions, loadLanguage(language), mentions(completion)]}
    />
  );
};

export default CodeEditor;
