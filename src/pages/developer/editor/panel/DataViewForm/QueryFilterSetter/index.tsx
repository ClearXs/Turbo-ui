import React from 'react';
import { observer } from '@formily/reactive-react';
import DraggableColumnList from '@/components/TableCrud/DraggableColumnList';
import useDataView from '../hook/useDataView';
import { FoldItem } from '@designable/react-settings-form';
import { useField } from '@formily/react';
import { usePrefix } from '@designable/react';
import cls from 'classnames';
import { Button } from '@douyinfe/semi-ui';
import useTableCrudContext from '@/components/TableCrud/hook/table';

export interface QueryFilterSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (dic: string) => void;
  value: string;
}

const QueryFilterSetter: React.FC<QueryFilterSetterProps> = observer(
  (props) => {
    const tableContext = useTableCrudContext();
    const field = useField();
    const dataView = useDataView();
    const prefix = usePrefix('dv-data-view-query-filter-setter');
    const columns = dataView.columns;

    const queryFilterColumns = columns.filter((col) => {
      return typeof col.search === 'function'
        ? col.search(tableContext)
        : col.search;
    });

    return (
      <FoldItem className={cls(prefix, props.className)} label={field.title}>
        <FoldItem.Extra>
          <DraggableColumnList
            columns={queryFilterColumns}
            onDrop={(columns) => (dataView.columns = columns)}
            bars={[]}
          />
        </FoldItem.Extra>
      </FoldItem>
    );
  },
);

export default QueryFilterSetter;
