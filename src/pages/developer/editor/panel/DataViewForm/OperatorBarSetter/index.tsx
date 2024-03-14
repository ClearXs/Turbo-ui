import React from 'react';
import { observer } from '@formily/reactive-react';
import useDataView from '../hook/useDataView';
import { FoldItem } from '@designable/react-settings-form';
import { useField } from '@formily/react';
import { usePrefix } from '@designable/react';
import cls from 'classnames';
import { Button, Typography } from '@douyinfe/semi-ui';
import { OperateToolbar } from '@/components/TableCrud/interface';
import {
  DELETE_LITERAL_OPERATOR_BAR,
  DETAILS_LITERAL_OPERATOR_BAR,
  EDIT_LITERAL_OPERATOR_BAR,
} from '@/components/TableCrud/TableCrudOperatorBar';
import BorderedList from '@/components/List/BorderedList';

export interface OperatorBarSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (dic: string) => void;
  value: string;
}

const OperatorBarSetter: React.FC<OperatorBarSetterProps> = observer(
  (props) => {
    const field = useField();
    const dataView = useDataView();
    const prefix = usePrefix('dv-data-view-query-filter-setter');
    const {
      showEdit = true,
      showDetails = true,
      showDelete = true,
      append = [],
    } = dataView.operateBar || {};

    const operatorBars: OperateToolbar<any>[] = [];
    showEdit && operatorBars.push(EDIT_LITERAL_OPERATOR_BAR);
    showDetails && operatorBars.push(DETAILS_LITERAL_OPERATOR_BAR);
    showDelete && operatorBars.push(DELETE_LITERAL_OPERATOR_BAR);
    operatorBars.push(...(append as OperateToolbar<any>[]));

    return (
      <FoldItem className={cls(prefix, props.className)} label={field.title}>
        <FoldItem.Base>
          <Button>asd</Button>
        </FoldItem.Base>
        <FoldItem.Extra>
          <BorderedList
            dataSource={operatorBars}
            label={(bar) => (
              <Typography.Text icon={bar.icon}>{bar.name}</Typography.Text>
            )}
            footer={(bar) => {}}
          ></BorderedList>
        </FoldItem.Extra>
      </FoldItem>
    );
  },
);

export default OperatorBarSetter;
