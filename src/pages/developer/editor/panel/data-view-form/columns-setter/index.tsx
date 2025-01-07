import React from 'react';
import { observer } from '@formily/reactive-react';
import DraggableColumnList from '@/components/table-crud/DraggableColumnList';
import useDataView from '../hook/useDataView';
import { FoldItem } from '@clearx/designable-react-settings-form';
import { useField } from '@formily/react';
import { usePrefix } from '@clearx/designable-react';
import cls from 'classnames';

export interface ColumnsSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (dic: string) => void;
  value: string;
}

const ColumnsSetter: React.FC<ColumnsSetterProps> = observer((props) => {
  const field = useField();
  const dataView = useDataView();
  const prefix = usePrefix('dv-data-view-columns-setter');
  const draggableColumns = dataView.columns;

  return (
    <FoldItem className={cls(prefix, props.className)} label={field.title}>
      <FoldItem.Extra>
        <DraggableColumnList
          columns={draggableColumns}
          onDrop={(columns) => (dataView.columns = columns)}
          bars={[]}
        />
      </FoldItem.Extra>
    </FoldItem>
  );
});

export default ColumnsSetter;
