import ColumnsSetter from './columns-setter';
import OperatorBarSetter from './operator-bar-setter';
import QueryFilterSetter from './query-filter-setter';
import ToolBarSetter from './toolbar-setter';
import viewMode from './constant/viewMode';

export default {
  type: 'object',
  properties: {
    mode: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'page',
        optionList: viewMode,
      },
    },
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    bordered: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    columns: {
      'x-component': ColumnsSetter,
    },
    queryFilter: {
      'x-component': QueryFilterSetter,
    },
    toolbar: {
      'x-component': ToolBarSetter,
    },
    operatorBar: {
      'x-component': OperatorBarSetter,
    },
  },
};
