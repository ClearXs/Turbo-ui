import { directGetIcon } from '../Icon/shared';
import {
  Button,
  Checkbox,
  List,
  Modal,
  Notification,
  Popover,
  Radio,
  RadioGroup,
  Space,
  Tooltip,
  Typography,
} from '@douyinfe/semi-ui';
import _ from 'lodash';
import {
  TableColumnProps,
  TableContext,
  TableCrudProps,
  Toolbar,
} from './interface';
import { FormContext } from '../TForm/interface';
import { IdEntity } from '@/api/interface';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useContext, useEffect, useRef, useState } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';
import { TableCrudContext } from './context';
import { TFormContext } from '../TForm/context';

export type TableToolbarProps<T extends IdEntity> = {
  tableProps: TableCrudProps<T>;
};

type DragListItemProps = {
  id: string;
  index: number;
  children: React.ReactNode;
  onHover: (dragItem: DragListItemProps, hoverItem: DragListItemProps) => void;
  onDrop: (item: DragListItemProps) => void;
};

const DropListItem = (props: DragListItemProps) => {
  const { id, index, children, onHover, onDrop } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragListItemProps,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'list',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragListItemProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onHover(item, props);
      item.index = hoverIndex;
    },
    drop(item: DragListItemProps, monitor) {
      onDrop(item);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'list',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.3 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{
        border: '1px dashed gray',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        opacity,
      }}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  );
};

const renderableToolbar = <T extends IdEntity>(
  formContext: FormContext<T>,
  tableContext: TableContext<T>,
  tableProps: TableCrudProps<T>,
) => {
  const [temporaryColumns, setTemporaryColumns] = useState<
    TableColumnProps<T>[]
  >([]);
  const displayColumns = temporaryColumns.filter((column) => {
    return (
      (typeof column.table === 'function'
        ? column.table(tableContext as TableContext<T>)
        : column.table) !== false
    );
  });

  useEffect(() => {
    const columns = tableContext.getTableColumns(true, false);
    setTemporaryColumns(columns || []);
  }, [tableContext]);

  const toolbar: Toolbar<T>[] = [];
  const {
    showAdd = true,
    showBatchDelete = true,
    showExport = true,
    showImport = true,
    showColumns = true,
    showOrdered = true,
    append = [],
  } = tableProps.toolbar || {};
  // 如果没有设置参数默认为false
  showAdd &&
    toolbar.push({
      code: 'add',
      name: '新增',
      position: 'left',
      type: 'primary',
      icon: directGetIcon('IconCopyAdd'),
      onClick: () => {
        formContext.type = 'add';
        formContext.visible = true;
        formContext.values = {};
      },
    });
  showBatchDelete &&
    toolbar.push({
      code: 'delete',
      name: '删除',
      position: 'left',
      type: 'danger',
      icon: directGetIcon('IconDelete'),
      onClick: (tableContext) => {
        if (_.isEmpty(tableContext.table.selectedRowKeys)) {
          Notification.error({
            position: 'top',
            content: '未选择任何记录',
          });
        } else {
          Modal.warning({
            title: '是否确定删除',
            onOk: () => {
              tableContext.tableApi.remove(
                tableContext,
                tableContext.table.selectedRowKeys as string[],
              );
            },
          });
        }
      },
    });

  toolbar.push({
    code: 'refresh',
    name: '刷新',
    position: 'right',
    type: 'primary',
    icon: directGetIcon('IconRefresh'),
    onClick: (tableContext) => {
      tableContext.tableApi.listOrPageOrTree(tableContext);
    },
  });

  // 导入
  showImport &&
    toolbar.push({
      code: 'import',
      name: '导入',
      position: 'right',
      type: 'primary',
      icon: directGetIcon('IconDescend2'),
    });

  // 导出
  showExport &&
    toolbar.push({
      code: 'export',
      name: '导出',
      position: 'right',
      type: 'primary',
      icon: directGetIcon('IconDownloadStroked'),
    });

  showColumns &&
    toolbar.push({
      code: 'columns',
      name: '显示列',
      position: 'right',
      type: 'primary',
      icon: directGetIcon('IconGridSquare'),
      popoverContent: (
        <div className="w-96 h-64 max-h-64 p-3 overflow-y-auto flex flex-col gap-2">
          <Typography.Title heading={6}>
            显示列
            <Tooltip content="支持拖动，顺序即为展示的顺序">
              {directGetIcon('IconHelpCircleStroked')}
            </Tooltip>
          </Typography.Title>
          <Checkbox
            checked={displayColumns.length === temporaryColumns.length}
            onChange={(e) => {
              const { checked } = e.target;
              const newColumns = [...temporaryColumns];
              newColumns.forEach((column) => (column.table = checked));
              tableContext.setTableColumns(newColumns);
            }}
          >
            全选 {`${displayColumns.length}/${temporaryColumns.length}`}
          </Checkbox>
          <DndProvider backend={HTML5Backend}>
            <List<TableColumnProps<T>>
              dataSource={temporaryColumns.sort(
                (col1, col2) => (col1.index || 0) - (col2.index || 0),
              )}
              renderItem={(column) => {
                const checked =
                  (typeof column.table === 'function'
                    ? column.table(tableContext as TableContext<T>)
                    : column.table) !== false;
                return (
                  <DropListItem
                    id={column.field}
                    index={column.index as number}
                    onHover={(dragItem, hoverItem) => {
                      const newColumns = [...temporaryColumns];
                      const dragCol = newColumns.find(
                        (col) => col.field === dragItem.id,
                      ) as TableColumnProps<T>;
                      dragCol.index = hoverItem.index;
                      const hoverCol = newColumns.find(
                        (col) => col.field === hoverItem.id,
                      ) as TableColumnProps<T>;
                      hoverCol.index = dragItem.index;
                      setTemporaryColumns(newColumns);
                    }}
                    onDrop={() => {
                      tableContext.setTableColumns(temporaryColumns);
                    }}
                  >
                    <List.Item
                      style={{ padding: '8px 16px' }}
                      header={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => {
                            const value = e.target.checked;
                            const newColumns = [...temporaryColumns];
                            newColumns.forEach((col) => {
                              if (col.field === column.field) {
                                col.table = value;
                              }
                            });
                            tableContext.setTableColumns(newColumns);
                          }}
                        />
                      }
                      main={<Typography.Text>{column.label}</Typography.Text>}
                      extra={
                        <Button
                          size="small"
                          icon={directGetIcon('IconHandle')}
                        />
                      }
                    />
                  </DropListItem>
                );
              }}
            />
          </DndProvider>
        </div>
      ),
    });

  // 排序
  showOrdered &&
    toolbar.push({
      code: 'ordered',
      name: '排序',
      position: 'right',
      type: 'primary',
      icon: directGetIcon('IconSortStroked'),
      popoverContent: (
        <div className="w-96 h-64 max-h-64 p-3 overflow-y-auto flex flex-col gap-2">
          <List<TableColumnProps<T>>
            dataSource={temporaryColumns}
            renderItem={(column) => {
              const sortOrder = column.sortOrder;
              return (
                <List.Item
                  style={{
                    border: '1px dashed gray',
                    padding: '8px 16px',
                    marginBottom: '.5rem',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                  main={<Typography.Text>{column.label}</Typography.Text>}
                  extra={
                    <RadioGroup
                      value={sortOrder}
                      onChange={(e) => {
                        const value = e.target.value;
                        column.sortOrder = value;
                        tableContext.tableApi.sort(tableContext, {
                          property: column.field,
                          order: value,
                          sorted: true,
                        });
                      }}
                    >
                      <Radio value="ascend">升序</Radio>
                      <Radio value="descend">降序</Radio>
                    </RadioGroup>
                  }
                />
              );
            }}
          />
        </div>
      ),
    });

  // 添加追加的菜单栏按钮
  toolbar.push(...append);
  return toolbar;
};

function TableToolbar<T extends IdEntity>(props: TableToolbarProps<T>) {
  const { tableProps } = props;
  const tableContext = useContext<TableContext<T>>(TableCrudContext);
  const formContext = useContext<FormContext<T>>(TFormContext);

  const toolbar = renderableToolbar(formContext, tableContext, tableProps);

  return (
    <div className="flex mt-3 mb-3 pl-2 pr-2">
      <Space>
        {toolbar
          .filter((bar) => bar.position === 'left')
          .map((bar, index) => {
            const BarButton = (
              <Button
                key={index}
                type={bar.type}
                icon={bar.icon}
                onClick={() => bar.onClick?.(tableContext, formContext)}
              >
                {bar.name}
              </Button>
            );
            return bar.popoverContent ? (
              <Popover
                key={index}
                trigger="click"
                closeOnEsc
                content={bar.popoverContent}
                position={bar.popoverPosition}
              >
                {BarButton}
              </Popover>
            ) : (
              BarButton
            );
          })}
      </Space>
      <div className="ml-auto">
        <Space>
          {toolbar
            .filter((bar) => bar.position === 'right')
            .map((bar, index) => {
              const TooltipBarButton = (
                <Tooltip key={index} content={bar.name} position="leftTop">
                  <Button
                    type={bar.type}
                    icon={bar.icon}
                    onClick={() => bar.onClick?.(tableContext, formContext)}
                  />
                </Tooltip>
              );
              return bar.popoverContent ? (
                <Popover
                  key={index}
                  trigger="click"
                  closeOnEsc
                  content={bar.popoverContent}
                  position={bar.popoverPosition}
                >
                  <span className="inline-block">{TooltipBarButton}</span>
                </Popover>
              ) : (
                TooltipBarButton
              );
            })}
          <RadioGroup
            type="button"
            value={tableContext.mode}
            onChange={(e) => {
              const value = e.target.value;
              tableContext.tableApi.switchMode(
                tableContext,
                value as TableCrudProps<T>['mode'],
              );
            }}
          >
            <Radio value="page">分页模式</Radio>
            <Radio value="cardPage">卡片模式</Radio>
            <Radio value="list">列表模式</Radio>
            <Radio value="tree">树形模式</Radio>
          </RadioGroup>
        </Space>
      </div>
    </div>
  );
}

export default TableToolbar;
