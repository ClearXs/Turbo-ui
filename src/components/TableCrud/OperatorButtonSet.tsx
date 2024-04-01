import { IdEntity } from '@/api';
import { OperateToolbar, TableContext } from './interface';
import { directGetIcon } from '../Icon/shared';
import { Button, ButtonGroup, Dropdown, Tooltip } from '@douyinfe/semi-ui';
import _ from 'lodash';
import { useContext } from 'react';
import { TableCrudContext } from './context/table';
import { FormContext } from '../TForm/interface';
import { TFormContext } from '../TForm/context/form';
import { observer } from '@formily/reactive-react';

export type OperatorButtonSetProps<T extends IdEntity> = {
  bars: OperateToolbar<T>[];
  record: T;
  // 当达到给定值时，使操作按钮缩略聚集起来。
  aggregate?: number;
  showButtonName?: boolean;
  className?: string;
  // 支持的模式
  // composite:  Button 和 Dropdown缩略的联合
  // mixed: 根据指定的aggregate与operate bar的数量进行比较 选择Button Or Dropdown
  // shrink：直接选择dropdown
  // direct:直接选择Button
  mode: 'composite' | 'mixed' | 'shrink' | 'direct';
};

const OperatorButtonSet = observer(
  <T extends IdEntity>({
    bars,
    record,
    aggregate = 3,
    mode = 'mixed',
    showButtonName = true,
    className,
  }: OperatorButtonSetProps<T>) => {
    const tableContext = useContext<TableContext<T>>(TableCrudContext);
    const formContext = useContext<FormContext<T>>(TFormContext);

    const CompositeButtonSetComponent = (
      retainBars: OperateToolbar<T>[],
      remainingBars?: OperateToolbar<T>[],
    ) => {
      return (
        <ButtonGroup className={className} theme="borderless">
          {retainBars.map((bar, index) => {
            return showButtonName ? (
              <Button
                key={index}
                theme="borderless"
                size={bar.size}
                icon={bar.icon}
                type={bar.type}
                onClick={(event) => {
                  event.stopPropagation();
                  bar.onClick?.(tableContext, formContext, record);
                }}
              >
                {bar.name}
              </Button>
            ) : (
              <Tooltip content={bar.name} key={index}>
                <Button
                  icon={bar.icon}
                  type={bar.type}
                  size={bar.size}
                  onClick={(event) => {
                    event.stopPropagation();
                    bar.onClick?.(tableContext, formContext, record);
                  }}
                />
              </Tooltip>
            );
          })}
          {remainingBars &&
            remainingBars.length > 0 &&
            DropdownSetComponent(remainingBars)}
        </ButtonGroup>
      );
    };

    const DropdownSetComponent = (operateBars: OperateToolbar<T>[]) => {
      if (_.isEmpty(operateBars)) {
        return <></>;
      }
      const internalOperateBars = operateBars.filter((bar) => bar.internal);
      const externalOperateBars = operateBars.filter((bar) => !bar.internal);
      return (
        <Dropdown
          trigger="hover"
          position="rightTop"
          clickToHide
          stopPropagation={true}
          render={
            <Dropdown.Menu>
              {internalOperateBars.map((bar, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    icon={bar.icon}
                    type={bar.type}
                    onClick={() =>
                      bar.onClick?.(tableContext, formContext, record)
                    }
                  >
                    {bar.name}
                  </Dropdown.Item>
                );
              })}
              {internalOperateBars.length > 0 &&
                externalOperateBars.length > 0 && <Dropdown.Divider />}
              {externalOperateBars.map((bar, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    icon={bar.icon}
                    type={bar.type}
                    onClick={(event) =>
                      bar.onClick?.(tableContext, formContext, record)
                    }
                  >
                    {bar.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          }
        >
          <Button
            className={className}
            theme="borderless"
            icon={directGetIcon('IconMoreStroked')}
            type="primary"
          />
        </Dropdown>
      );
    };

    if (mode === 'composite') {
      const retainBars = bars.splice(0, aggregate);
      const remainingBars = bars.slice(0);
      return CompositeButtonSetComponent(retainBars, remainingBars);
    } else if (mode === 'mixed') {
      if (bars.length > aggregate) {
        return DropdownSetComponent(bars);
      } else {
        return CompositeButtonSetComponent(bars);
      }
    } else if (mode === 'shrink') {
      return DropdownSetComponent(bars);
    } else if (mode === 'direct') {
      return CompositeButtonSetComponent(bars);
    } else {
      return <></>;
    }
  },
);

export default OperatorButtonSet;
