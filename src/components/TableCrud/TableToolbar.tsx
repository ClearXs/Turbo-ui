import { tryGetIcon } from '../Icon/shared';
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
import { IdEntity } from '@/api';
import { useContext, useMemo } from 'react';
import { TableCrudContext } from './context/table';
import Modular from '../Modular/Modular';
import { useIconBar, useOperabilityBar, useTextIconBar } from './hook/bar';
import DraggableColumnList from './DraggableColumnList';
import BorderedList from '../List/BorderedList';

export const ADD_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'add',
  name: '新增',
  position: 'left',
  type: 'primary',
  icon: tryGetIcon('IconCopyAdd'),
};

export const DELETE_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'delete',
  name: '删除',
  position: 'left',
  type: 'danger',
  icon: tryGetIcon('IconDelete'),
};

export const REFRESH_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'refresh',
  name: '刷新',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconRefresh'),
};

export const IMPORT_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'import',
  name: '导入',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconDescend2'),
};

export const EXPORT_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'export',
  name: '导出',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconDownloadStroked'),
};

export const SHOW_COLUMN_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'columns',
  name: '显示列',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconGridSquare'),
};

export const ORDERED_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'ordered',
  name: '排序',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconSortStroked'),
};

const renderableToolbar = <T extends IdEntity>(
  tableContext: TableContext<T>,
  tableProps: TableCrudProps<T>,
  operabilityBar: <T extends Bar<any>>(props: T) => T,
) => {
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
  }, [tableContext]);

  const { temporaryColumns, displayColumns } = tool;

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
        formContext.type = 'add';
        formContext.visible = true;
        formContext.values = {};
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
      popoverContent: (
        <div className="w-96 h-64 max-h-64 p-3 overflow-y-auto flex flex-col gap-2">
          <Typography.Title heading={6}>
            显示列
            <Tooltip content="支持拖动，顺序即为展示的顺序">
              {tryGetIcon('IconHelpCircleStroked')}
            </Tooltip>
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
          <DraggableColumnList<T>
            columns={temporaryColumns}
            onDrop={(columns) => (tableContext.tableColumns = columns)}
            onCheck={(column) => {
              const newColumns = [...temporaryColumns];
              newColumns.forEach((col) => {
                if (col.field === column.field) {
                  col.table = true;
                }
              });
              tableContext.tableColumns = newColumns;
            }}
          />
        </div>
      ),
    };
    toolbar.push(operabilityBar(showColumnsToolbar));
  }

  // ordered
  if (showOrdered) {
    const orderedToolbar: Toolbar<T> = {
      ...ORDERED_LITERAL_TOOLBAR,
      popoverContent: (
        <div className="w-96 h-64 max-h-64 p-3 overflow-y-auto flex flex-col gap-2">
          <BorderedList
            dataSource={temporaryColumns}
            label={(column) => column.label}
            footer={(column) => {
              const sortOrder = column.sortOrder;
              return (
                <RadioGroup
                  value={sortOrder as string}
                  onChange={(e) => {
                    const value = e.target.value;
                    column.sortOrder = value;
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
      ),
    };
    toolbar.push(operabilityBar(orderedToolbar));
  }

  // 添加追加的菜单栏按钮
  for (const appendToolbar of append) {
    toolbar.push(operabilityBar(appendToolbar));
  }

  return toolbar;
};

function TableToolbar<T extends IdEntity>(props: TableToolbarProps<T>) {
  const { tableProps } = props;

  const { show = true } = tableProps.toolbar || {};
  const { showModelSwitch = true } = tableProps.toolbar || {};
  const tableContext = useContext<TableContext<T>>(TableCrudContext);
  const textIconBar = useTextIconBar();
  const iconBar = useIconBar();
  const operabilityBar = useOperabilityBar();

  const toolbar = renderableToolbar(tableContext, tableProps, operabilityBar);

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
                  { value: 'page', label: '分页模式' },
                  { value: 'cardPage', label: '卡片模式' },
                  { value: 'list', label: '列表模式' },
                  { value: 'tree', label: '树形模式' },
                  { value: 'scrollingList', label: '滚动列表' },
                ]}
              />
            )}
          </Space>
        </div>
      </div>
    )
  );
}

export default TableToolbar;
