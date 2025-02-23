import React from 'react';
import { observer } from 'mobx-react';
import useDataView from '../hook/useDataView';
import { FoldItem } from '@clearx/designable-react-settings-form';
import { useField } from '@formily/react';
import { usePrefix } from '@clearx/designable-react';
import cls from 'classnames';
import { Typography } from '@douyinfe/semi-ui';
import { Toolbar } from '@/components/table-crud/interface';
import BorderedList from '@/components/list/BorderedList';
import {
  ADD_LITERAL_TOOLBAR,
  DELETE_LITERAL_TOOLBAR,
  EXPORT_LITERAL_TOOLBAR,
  IMPORT_LITERAL_TOOLBAR,
  ORDERED_LITERAL_TOOLBAR,
  REFRESH_LITERAL_TOOLBAR,
  SHOW_COLUMN_LITERAL_TOOLBAR,
} from '@/components/bar/collection';

export interface ToolBarSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (dic: string) => void;
  value: string;
}

const ToolBarSetter: React.FC<ToolBarSetterProps> = observer((props) => {
  const field = useField();
  const dataView = useDataView();
  const prefix = usePrefix('dv-data-view-query-filter-setter');
  const {
    showAdd = true,
    showBatchDelete = true,
    showRefresh = true,
    showExport = true,
    showImport = true,
    showColumns = true,
    showOrdered = true,
    append = [],
  } = dataView.toolbar || {};

  const toolbars: Toolbar<any>[] = [];
  showAdd && toolbars.push(ADD_LITERAL_TOOLBAR);
  showBatchDelete && toolbars.push(DELETE_LITERAL_TOOLBAR);
  showRefresh && toolbars.push(REFRESH_LITERAL_TOOLBAR);
  showExport && toolbars.push(EXPORT_LITERAL_TOOLBAR);
  showImport && toolbars.push(IMPORT_LITERAL_TOOLBAR);
  showColumns && toolbars.push(SHOW_COLUMN_LITERAL_TOOLBAR);
  showOrdered && toolbars.push(ORDERED_LITERAL_TOOLBAR);
  toolbars.push(...append);

  return (
    <FoldItem className={cls(prefix, props.className)} label={field.title}>
      <FoldItem.Extra>
        <BorderedList
          dataSource={toolbars}
          label={(bar) => (
            <Typography.Text icon={bar.icon}>{bar.name}</Typography.Text>
          )}
          footer={(bar) => {}}
        ></BorderedList>
      </FoldItem.Extra>
    </FoldItem>
  );
});

export default ToolBarSetter;
