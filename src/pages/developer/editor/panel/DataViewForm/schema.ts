import ColumnsSetter from './ColumnsSetter';
import OperatorBarSetter from './OperatorBarSetter';
import QueryFilterSetter from './QueryFilterSetter';
import ToolBarSetter from './ToolbarSetter';

export default {
  type: 'object',
  properties: {
    mode: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'page',
        optionList: [
          { label: '无分页列表', value: 'list' },
          { label: '分页列表', value: 'page' },
          { label: '树', value: 'tree' },
          { label: '卡片列表', value: 'cardPage' },
          { label: '滚动列表', value: 'scrollingList' },
          { label: '滚动卡片', value: 'scrollingCard' },
          { label: '左树右列表', value: 'leftTreeRightList' },
          { label: '左树右分页列表', value: 'leftTreeRightPage' },
          { label: '左树右树', value: 'leftTreeRightTree' },
          { label: '左树右分页卡片列表', value: 'leftTreeRightCardPage' },
          {
            label: '左树右滚动卡片列表',
            value: 'leftTreeRightScrollingCard',
          },
          { label: '左树右滚动列表', value: 'leftTreeRightScrollingList' },
        ],
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
