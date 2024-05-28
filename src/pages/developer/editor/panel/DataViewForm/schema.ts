import ColumnsSetter from './ColumnsSetter';
import OperatorBarSetter from './OperatorBarSetter';
import QueryFilterSetter from './QueryFilterSetter';
import ToolBarSetter from './ToolbarSetter';
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
