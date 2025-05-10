import { tryGetIcon } from '../icon/shared';
import {
  Checkbox,
  Notification,
  Radio,
  RadioGroup,
  Space,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import _ from 'lodash';
import {
  Bar,
  TableContext,
  TableCrudProps,
  TableToolbarProps,
  Toolbar,
} from './interface';
import { Entity } from '@/api';
import React, { useMemo } from 'react';
import Modular from '../modular/Modular';
import { useIconBar, useOperabilityBar, useTextIconBar } from './hook/bar';
import DraggableColumnList from './DraggableColumnList';
import BorderedList from '../list/BorderedList';
import {
  ADD_LITERAL_TOOLBAR,
  DELETE_LITERAL_TOOLBAR,
  EXPORT_LITERAL_TOOLBAR,
  IMPORT_LITERAL_TOOLBAR,
  ORDERED_LITERAL_TOOLBAR,
  REFRESH_LITERAL_TOOLBAR,
  SHOW_COLUMN_LITERAL_TOOLBAR,
} from '../bar/collection';
import useTableCrudContext from './hook/table';
import { observer } from 'mobx-react';

function TableToolbar<T extends Entity>(props: TableToolbarProps<T>) {
  const { tableProps } = props;

  const { show = true } = tableProps.toolbar || {};
  const { showModelSwitch = true } = tableProps.toolbar || {};
  const tableContext = useTableCrudContext();
  const textIconBar = useTextIconBar();
  const iconBar = useIconBar();
  const operabilityBar = useOperabilityBar();

  const toolbar = renderToolbar(tableProps, operabilityBar);

  return (
    show && (
      <div className="flex mt-3 mb-3 pl-2 pr-2">
        <Space>
          {toolbar
            .filter((bar) => bar.position === 'left')
            .map((bar) => textIconBar(bar))}
        </Space>
        <div className="ml-auto">
          <Space>
            {toolbar
              .filter((bar) => bar.position === 'right')
              .map((bar) => iconBar(bar))}
            {showModelSwitch && (
              <RadioGroup
                type="button"
                disabled={
                  tableContext.props.operability === undefined
                    ? false
                    : !tableContext.props.operability
                }
                value={tableContext.mode}
                onChange={(e) => {
                  const value = e.target.value;
                  tableContext.mode = value;
                }}
                options={[
                  {
                    value: 'page',
                    label: (
                      <Tooltip content="分页模式">
                        {tryGetIcon('IconPageModel')}
                      </Tooltip>
                    ),
                  },
                  {
                    value: 'cardPage',
                    label: (
                      <Tooltip content="卡片模式">
                        {tryGetIcon('IconCardModel')}
                      </Tooltip>
                    ),
                  },
                  {
                    value: 'list',
                    label: (
                      <Tooltip content="列表模式">
                        {tryGetIcon('IconListModel')}
                      </Tooltip>
                    ),
                  },
                  {
                    value: 'tree',
                    label: (
                      <Tooltip content="树形模式">
                        {tryGetIcon('IconTreeModel')}
                      </Tooltip>
                    ),
                  },
                  {
                    value: 'scrollingList',
                    label: (
                      <Tooltip content="滚动列表模式">
                        {tryGetIcon('IconScrollingListModel')}
                      </Tooltip>
                    ),
                  },
                ]}
              />
            )}
          </Space>
        </div>
      </div>
    )
  );
}

const renderToolbar = <T extends Entity>(
  tableProps: TableCrudProps<T>,
  operabilityBar: <T extends Bar<any>>(props: T) => T,
) => {
  const toolbar: Toolbar<T>[] = [];
  const {
    showAdd = true,
    showBatchDelete = true,
    showRefresh = true,
    showExport = true,
    showImport = true,
    showColumns = true,
    showOrdered = true,
    append = [],
  } = tableProps.toolbar || {};

  // add
  if (showAdd) {
    const addToolbar: Toolbar<T> = {
      ...ADD_LITERAL_TOOLBAR,
      onClick(tableContext, formContext) {
        if (formContext) {
          formContext.type = 'add';
          formContext.visible = true;
          formContext.setValues(formContext.getDefaultValues());
        }
      },
    };
    toolbar.push(operabilityBar(addToolbar));
  }

  // delete
  if (showBatchDelete) {
    const deleteToolbar: Toolbar<T> = {
      ...DELETE_LITERAL_TOOLBAR,
      onClick(tableContext, formContext) {
        if (_.isEmpty(tableContext.table.selectedRowKeys)) {
          Notification.error({
            position: 'top',
            content: '未选择任何记录',
          });
        } else {
          Modular.warning({
            title: '是否确定删除',
            onConfirm: () => {
              tableContext.tableApi.remove(
                tableContext.table.selectedRowKeys as string[],
              );
            },
          });
        }
      },
    };
    toolbar.push(deleteToolbar);
  }

  // refresh
  if (showRefresh) {
    const refreshToolbar: Toolbar<T> = {
      ...REFRESH_LITERAL_TOOLBAR,
      onClick(tableContext, formContext) {
        tableContext.tableApi.listOrPageOrTree();
        tableContext.inlineEditorApi.clear();
      },
    };
    toolbar.push(operabilityBar(refreshToolbar));
  }

  // import
  if (showImport) {
    const importToolbar: Toolbar<T> = { ...IMPORT_LITERAL_TOOLBAR };
    toolbar.push(operabilityBar(importToolbar));
  }

  // export
  if (showExport) {
    const exportToolbar: Toolbar<T> = { ...EXPORT_LITERAL_TOOLBAR };
    toolbar.push(operabilityBar(exportToolbar));
  }

  // show columns
  if (showColumns) {
    const showColumnsToolbar: Toolbar<T> = {
      ...SHOW_COLUMN_LITERAL_TOOLBAR,
      popoverContent: <ObserverDisplayColumn />,
    };
    toolbar.push(operabilityBar(showColumnsToolbar));
  }

  // ordered
  if (showOrdered) {
    const orderedToolbar: Toolbar<T> = {
      ...ORDERED_LITERAL_TOOLBAR,
      popoverContent: <ObserverBorderedColumn />,
    };
    toolbar.push(operabilityBar(orderedToolbar));
  }

  // 添加追加的菜单栏按钮
  for (const appendToolbar of append) {
    toolbar.push(operabilityBar(appendToolbar));
  }

  return toolbar;
};

const ObserverDisplayColumn: React.FC<{}> = observer(<T extends Entity>() => {
  const tableContext = useTableCrudContext();

  const tool = useMemo(() => {
    const temporaryColumns = tableContext.getTableColumns(true, false);
    const displayColumns = temporaryColumns.filter((column) => {
      return (
        (typeof column.table === 'function'
          ? column.table(tableContext as TableContext<T>)
          : column.table) !== false
      );
    });
    return { temporaryColumns, displayColumns };
  }, [tableContext.tableColumns]);

  const { temporaryColumns, displayColumns } = tool;

  const ObserverDraggableColumnList = useMemo(
    () => observer(DraggableColumnList),
    [tableContext.tableColumns],
  );

  return (
    <div className="w-96 h-64 max-h-64 p-3 overflow-y-auto flex flex-col gap-2">
      <Typography.Title heading={6}>
        显示列
        <Tooltip content="支持拖动，顺序即为展示的顺序">❓</Tooltip>
      </Typography.Title>
      <Checkbox
        checked={displayColumns.length === temporaryColumns.length}
        onChange={(e) => {
          const { checked } = e.target;
          const newColumns = [...temporaryColumns];
          newColumns.forEach((column) => (column.table = checked));
          tableContext.tableColumns = newColumns;
        }}
      >
        全选 {`${displayColumns.length}/${temporaryColumns.length}`}
      </Checkbox>
      <ObserverDraggableColumnList<T>
        columns={temporaryColumns}
        onDrop={(columns) => (tableContext.tableColumns = columns)}
        onCheck={(column) => {
          const newColumns = [...temporaryColumns];
          newColumns.forEach((col) => {
            if (col.field === column.field) {
              col.table = !col.table;
            }
          });
          tableContext.tableColumns = newColumns;
        }}
      />
    </div>
  );
});

const ObserverBorderedColumn: React.FC = observer(() => {
  const tableContext = useTableCrudContext();
  const temporaryColumns = tableContext.getTableColumns(true, false);

  const ObserverBorderedList = useMemo(
    () => observer(BorderedList),
    [tableContext.tableColumns],
  );

  return (
    <div className="w-96 h-64 max-h-64 p-3 overflow-y-auto flex flex-col gap-2">
      <ObserverBorderedList
        dataSource={temporaryColumns}
        label={(column) => column.label}
        footer={(column) => {
          const sortOrder = column.sortOrder;
          return (
            <RadioGroup
              value={sortOrder as string}
              onChange={(e) => {
                const value = e.target.value;
                const newColumns = [...temporaryColumns];
                newColumns.forEach((col) => {
                  if (col.field === column.field) {
                    col.sortOrder = value;
                  }
                });
                tableContext.tableColumns = newColumns;
                tableContext.tableApi.sort({
                  property: column.field,
                  order: value,
                  sorted: true,
                });
              }}
            >
              <Radio value="ascend">升序</Radio>
              <Radio value="descend">降序</Radio>
            </RadioGroup>
          );
        }}
      />
    </div>
  );
});

export default TableToolbar;
