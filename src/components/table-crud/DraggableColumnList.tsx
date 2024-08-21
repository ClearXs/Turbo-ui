import { IdEntity } from '@/api';
import { Identifier, XYCoord } from 'dnd-core';
import { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { Bar, TableColumnProps, TableContext } from './interface';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Checkbox, List, Typography } from '@douyinfe/semi-ui';
import { tryGetIcon } from '../icon';
import _ from 'lodash';
import ButtonSpace from '../button-space/ButtonSpace';
import { useIconBar } from './hook/bar';
import useTableCrudContext from './hook/table';

export type DraggableBar<T extends IdEntity> = Omit<Bar<T>, 'onClick'> & {
  onClick?: (
    tableContext: TableContext<T>,
    column: TableColumnProps<T>,
  ) => void;
};

export type DraggableColumnListProps<T extends IdEntity> = {
  columns: TableColumnProps<T>[];
  // check回调，当该属性存在时显示check
  onCheck?: (column: TableColumnProps<T>) => void;
  // 当Drop结束时进行调用
  onDrop?: (columns: TableColumnProps<T>[]) => void;
  // 操作栏
  bars?: DraggableBar<T>[];
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

const DraggableColumnList = <T extends IdEntity>(
  props: DraggableColumnListProps<T>,
) => {
  const tableContext = useTableCrudContext();
  const IconBar = useIconBar();
  const { columns, onCheck, onDrop, bars = [] } = props;
  const [temporaryColumns, setTemporaryColumns] =
    useState<TableColumnProps<T>[]>(columns);

  if (_.isEmpty(bars)) {
    bars.push({
      code: 'drag',
      name: '拖动',
      type: 'primary',
      icon: tryGetIcon('IconHandle'),
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <List<TableColumnProps<T>>
        dataSource={temporaryColumns.sort(
          (col1, col2) => (col1.index || 0) - (col2.index || 0),
        )}
        renderItem={(column) => {
          const checked =
            (typeof column.table === 'function'
              ? column.table(tableContext)
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
              onDrop={() => onDrop?.(temporaryColumns)}
            >
              <List.Item
                style={{ padding: '4px 16px' }}
                header={
                  onCheck && (
                    <Checkbox
                      checked={checked}
                      onChange={(e) => {
                        onCheck(column);
                      }}
                    />
                  )
                }
                main={<Typography.Text>{column.label}</Typography.Text>}
                extra={
                  <ButtonSpace>
                    {bars.map((bar) =>
                      IconBar(bar, () => bar.onClick?.(tableContext, column)),
                    )}
                  </ButtonSpace>
                }
              />
            </DropListItem>
          );
        }}
      />
    </DndProvider>
  );
};

export default DraggableColumnList;
