import { Button, Popover, Tooltip } from '@douyinfe/semi-ui';
import { Bar } from '../interface';
import useTableCrudContext from './table';

// 基于可操作性属性返回可操作性的按钮
export const useOperabilityBar = () => {
  const tableContext = useTableCrudContext();
  return <T extends Bar<any>>(props: T): T => {
    const operability =
      tableContext.props.operability === undefined
        ? true
        : tableContext.props.operability;
    return {
      ...props,
      disabled: props.disabled || !operability,
      onClick(tableContext, formContext) {
        return operability && props.onClick?.(tableContext, formContext);
      },
    };
  };
};

export const useIconBar = () => {
  const tableContext = useTableCrudContext();
  return <T extends Bar<any>>(barProps: T, on?: () => void) => {
    const {
      code,
      type,
      icon,
      name,
      disabled = false,
      onClick,
      popoverContent,
      popoverPosition,
    } = barProps;
    const TooltipBarButton = (
      <Tooltip key={code} content={name} position="leftTop">
        <Button
          type={type}
          icon={icon}
          disabled={disabled}
          onClick={() =>
            on?.() || onClick?.(tableContext, tableContext.formContext)
          }
        />
      </Tooltip>
    );
    return popoverContent ? (
      <Popover
        key={code}
        trigger="click"
        closeOnEsc
        content={popoverContent}
        position={popoverPosition}
      >
        <span className="inline-block">{TooltipBarButton}</span>
      </Popover>
    ) : (
      TooltipBarButton
    );
  };
};

export const useTextIconBar = () => {
  const tableContext = useTableCrudContext();
  return <T extends Bar<any>>(barProps: T, on?: () => void) => {
    const {
      code,
      type,
      icon,
      name,
      disabled = false,
      onClick,
      popoverContent,
      popoverPosition,
    } = barProps;
    const BarButton = (
      <Button
        key={code}
        type={type}
        icon={icon}
        disabled={disabled}
        onClick={() =>
          on?.() || onClick?.(tableContext, tableContext.formContext)
        }
      >
        {name}
      </Button>
    );
    return popoverContent ? (
      <Popover
        key={code}
        trigger="click"
        closeOnEsc
        content={popoverContent}
        position={popoverPosition}
      >
        {BarButton}
      </Popover>
    ) : (
      BarButton
    );
  };
};
