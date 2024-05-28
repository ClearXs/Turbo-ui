import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  GlobalSchemaColumnRegistry,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { observer } from '@formily/reactive-react';
import { FormCodeEditorColumnProps } from '../../components';
import CodeEditor from '@/components/CodeEditor/CodeEditor';

const CodeEditorSchema: SchemaColumn<FormCodeEditorColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      title: column.label,
      name: column.initValue,
      type: 'object',
      required: column.require as boolean,
      'x-decorator': 'FormItem',
      'x-component': CodeEditorSetter,
      'x-validator': [],
      'x-reactions': column.reaction,
      'x-component-props': {
        language: column.language,
        completion: column.completion,
        readOnly: formContext.type === 'details' ? true : false,
        basicSetup: column.basicSetup,
      },
    };
  },

  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'codeEditor',
    };
  },
};

type ICodeEditorSetterProps = {
  value?: any;
  language: FormCodeEditorColumnProps<any>['language'];
  completion: FormCodeEditorColumnProps<any>['completion'];
  basicSetup: FormCodeEditorColumnProps<any>['basicSetup'];
  onChange?: (value: any) => void;
};

const CodeEditorSetter: React.FC<ICodeEditorSetterProps> = observer(
  ({ value, language, completion, basicSetup, ...props }) => {
    return (
      <>
        <CodeEditor
          value={value instanceof Object ? '' : value}
          basicSetup={basicSetup}
          language={language}
          completion={completion}
          extensions={[]}
          {...props}
        />
      </>
    );
  },
);

GlobalSchemaColumnRegistry.addSchemaColumn('codeEditor', CodeEditorSchema);
