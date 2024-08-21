import { CodeEditorProps } from './interface';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { mentions } from '@uiw/codemirror-extensions-mentions';
import mvel from './mentions/mvel';
import utility from './mentions/utility';

const CodeEditor: React.FC<CodeEditorProps> = ({
  extensions = [],
  completion = [],
  language,
  ...props
}) => {
  const fulfillMentions = [...completion, ...mvel, ...utility];
  return (
    <CodeMirror
      {...props}
      extensions={[
        ...extensions,
        loadLanguage(language),
        mentions(fulfillMentions),
      ]}
    />
  );
};

export default CodeEditor;
