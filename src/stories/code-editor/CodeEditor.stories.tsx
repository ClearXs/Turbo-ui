import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CodeEditor from '../../components/code-editor/CodeEditor';
import { CodeEditorProps } from '../../components/code-editor/interface';

const theme: CodeEditorProps['theme'][] = ['none', 'light', 'dark'];

const meta: Meta<typeof CodeEditor> = {
  title: 'Component/CodeEditor',
  component: CodeEditor,
  argTypes: {
    value: {
      description: 'value',
    },
    height: {
      table: {
        defaultValue: {
          summary: '100%',
        },
      },
      description: '组件高度',
    },
    minHeight: {
      type: 'string',
      description: '组件最小高度',
    },
    maxHeight: {
      type: 'string',
      description: '组件最大高度',
    },
    width: {
      type: 'string',
      description: '组件宽度',
    },
    minWidth: {
      type: 'string',
      description: '组件最小宽度',
    },
    maxWidth: {
      type: 'string',
      description: '组件最大宽度',
    },
    theme: {
      options: theme,
      description: '主题',
      control: 'select',
      table: {
        defaultValue: {
          summary: 'light',
        },
        type: {
          summary: 'string',
          detail: 'none|light|dark',
        },
      },
    },
    autoFocus: {
      description: '聚焦编辑器',
      type: 'boolean',
    },
    language: {
      description: '编辑器语言',
      table: {
        defaultValue: {
          summary: 'javascript',
        },
        type: {
          summary: 'string',
          detail: 'javascript|java|rust|go|c|typescript...',
        },
      },
    },
    editable: {
      type: 'boolean',
      description: '是否可编辑',
    },
    readOnly: {
      type: 'boolean',
      description: '是否只读',
    },
    extensions: {
      table: {
        type: {
          summary: 'Extension[]',
        },
      },
      description:
        '编辑器插件，可以通过官网查看更加详细的说明https://codemirror.net/docs/ref/#state.EditorStateConfig.extensions',
    },
    completion: {
      table: {
        type: {
          summary: 'Completion[]',
          detail:
            '比如:\n {\n"label":"@foreach{}",\n"detail":"@foreach{} Foreach iteration",\n"info":"The foreach tag allows you to iterate either collections or arrays in your template.",\n"section":{"name":"mvel"}\n}',
        },
      },
      description: '输入时的提示词',
    },
    onChange: {
      type: 'function',
      control: 'text',
      description: '当值改变时触发',
    },
    onUpdate: {
      type: 'function',
      control: 'text',
      description:
        'Fired whenever any state change occurs within the editor, including non-document changes like lint results.',
    },
    onStatistics: {
      type: 'function',
      control: 'text',
      description: 'Some data on the statistics editor.',
    },
    onCreateEditor: {
      type: 'function',
      control: 'text',
      description: 'The first time the editor executes the event.',
    },
  },
  args: {
    value: '',
    height: '100%',
    width: '100%',
    theme: 'light',
    language: 'javascript',
    onChange: fn(),
    onUpdate: fn(),
    onStatistics: fn(),
    onCreateEditor: fn(),
  },
};

type Store = StoryObj<typeof meta>;

export const Default: Store = {};

export default meta;
