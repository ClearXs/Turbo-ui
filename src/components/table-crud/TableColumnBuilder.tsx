import { Entity } from '@/api';
import { OperateToolbar, TableColumnProps, TableContext } from './interface';
import OperatorButtonSet from './OperatorButtonSet';
import _ from 'lodash';
import Modular from '../modular/Modular';
import {
  COPY_LITERAL_OPERATOR_BAR,
  DELETE_LITERAL_OPERATOR_BAR,
  DETAILS_LITERAL_OPERATOR_BAR,
  EDIT_LITERAL_OPERATOR_BAR,
  INLINE_CANCEL_LITERAL_OPERATOR_BAR,
  INLINE_EDIT_LITERAL_OPERATOR_BAR,
  INLINE_SAVE_LITERAL_OPERATOR_BAR,
} from '../bar/collection';

const COPY_IGNORE_KEYS = [
  'id',
  'tenantId',
  'createdTime',
  'createdBy',
  'updatedTime',
  'updateBy',
  'isDeleted',
  'version',
  'categoryId',
  'parent',
  'children',
];

export default class TableColumnsBuilder<T extends Entity> {
  constructor(
    private columns: TableColumnProps<T>[],
    private tableContext: TableContext<T>,
  ) {}

  // form与table字段的同步
  public sync(): TableColumnsBuilder<T> {
    this.columns = this.columns.map((column, index) => {
      const newColumn = { ...column };
      if (newColumn.dataIndex) {
        newColumn.field = newColumn.dataIndex;
      } else {
        newColumn.dataIndex = newColumn.field;
      }
      if (newColumn.label) {
        newColumn.title = newColumn.label;
      }
      // 排序
      if (!newColumn.index) {
        newColumn.index = index;
      }
      return newColumn;
    });
    return this;
  }

  // table crud columns transfer semi table columns
  public build(
    exclusiveOperate: boolean = false,
    immediateFilter: boolean = true,
    fixed: boolean = false,
  ): TableColumnProps<T>[] {
    if (_.isEmpty(this.columns)) {
      return [];
    }
    const columns = [...this.columns];
    if (!exclusiveOperate) {
      columns.push({
        title: '操作栏',
        index: Number.MAX_VALUE,
        dataIndex: 'operate',
        field: 'operate',
        align: 'center',
        type: 'undefined',
        fixed: fixed === true ? 'right' : undefined,
        width: fixed === true ? 300 : '30%',
        render: (text, record) => {
          const operatorBarList = renderOperatorBar(record, this.tableContext);
          return (
            <OperatorButtonSet<T>
              bars={operatorBarList}
              record={record}
              mode="composite"
              showButtonName={true}
              className="justify-center items-center"
            />
          );
        },
      } as TableColumnProps<T>);
    }
    const filterColumns = immediateFilter
      ? columns.filter((column) => {
          return (
            (typeof column.table === 'function'
              ? column.table(this.tableContext)
              : column.table) !== false
          );
        })
      : columns;

    return filterColumns.sort(
      (col1, col2) => (col1.index || 0) - (col2.index || 0),
    );
  }
}

export const renderOperatorBar = <T extends Entity>(
  record: T,
  tableContext: TableContext<T>,
): OperateToolbar<T>[] => {
  const {
    tableApi,
    inlineEditorApi,
    helperApi,
    props: { operateBar },
  } = tableContext;
  const bars: OperateToolbar<T>[] = [];

  const {
    showInlineEdit = false,
    showEdit = true,
    showDetails = true,
    showDelete = true,
    showCopy = false,
    append = [],
  } = operateBar || {};

  const id = helperApi.getId(record);
  const isEditing = inlineEditorApi.isEditing(id);

  // 行内编辑
  if (
    ((typeof showInlineEdit === 'function' && showInlineEdit(record)) ||
      showInlineEdit === true) &&
    !isEditing
  ) {
    const inlineEditOperatorBar: OperateToolbar<T> = {
      ...INLINE_EDIT_LITERAL_OPERATOR_BAR,
      onClick(value, tableContext, formContext) {
        tableContext?.tableApi.inlineEdit(id);
      },
    };
    bars.push(inlineEditOperatorBar);
  }

  // inline save operation
  if (isEditing) {
    const inlineSaveOperatorBar: OperateToolbar<T> = {
      ...INLINE_SAVE_LITERAL_OPERATOR_BAR,
      onClick(value, tableContext, formContext) {
        inlineEditorApi.save(id);
      },
    };
    bars.push(inlineSaveOperatorBar);
  }

  // inline cancel operation
  if (isEditing) {
    const inlineCancelOperatorBar: OperateToolbar<T> = {
      ...INLINE_CANCEL_LITERAL_OPERATOR_BAR,
      onClick(value, tableContext, formContext) {
        inlineEditorApi.finish(helperApi.getId(value));
      },
    };
    bars.push(inlineCancelOperatorBar);
  }

  // 编辑
  if (
    (typeof showEdit === 'function' && showEdit(record)) ||
    showEdit === true
  ) {
    const editOperatorBar: OperateToolbar<T> = {
      ...EDIT_LITERAL_OPERATOR_BAR,
      onClick(value, tableContext, formContext) {
        tableContext.tableApi.edit(id);
      },
    };
    bars.push(editOperatorBar);
  }
  // 详情
  if (
    (typeof showDetails === 'function' && showDetails(record)) ||
    showDetails === true
  ) {
    const detailsOperatorBar: OperateToolbar<T> = {
      ...DETAILS_LITERAL_OPERATOR_BAR,
      onClick: (record, tableContext, formContext) => {
        tableContext?.tableApi.details(id);
      },
    };
    bars.push(detailsOperatorBar);
  }
  // 删除
  if (
    (typeof showDelete === 'function' && showDelete(record)) ||
    showDelete === true
  ) {
    const deleteOperatorBar: OperateToolbar<T> = {
      ...DELETE_LITERAL_OPERATOR_BAR,
      onClick(value, tableContext, formContext) {
        Modular.warning({
          title: '是否确定删除?',
          content: '该数据被删除，与其关联的数据将无法使用，请慎重操作!',
          onConfirm: () => {
            tableApi?.remove([id]);
          },
        });
      },
    };
    bars.push(deleteOperatorBar);
  }
  // 复制
  if (
    (typeof showCopy === 'function' && showCopy(record)) ||
    showCopy === true
  ) {
    const copyOperatorBar: OperateToolbar<T> = {
      ...COPY_LITERAL_OPERATOR_BAR,
      onClick(value, tableContext, formContext) {
        const copyValues = _.assignWith(
          {},
          value,
          (objectValue, sourceValue, key, object, source) => {
            if (key && COPY_IGNORE_KEYS.includes(key)) {
              return null;
            }
            return key && source?.[key];
          },
        );
        if (formContext) {
          formContext.type = 'add';
          formContext.visible = true;
          formContext.setValues(copyValues);
        }
      },
    };
    bars.push(copyOperatorBar);
  }
  append.forEach((bar) => {
    if (typeof bar === 'function') {
      const maybeBar = bar(record);
      if (maybeBar) {
        bars.push({ ...maybeBar, internal: false });
      }
    } else {
      bars.push({ ...bar, internal: false });
    }
  });
  return bars;
};
