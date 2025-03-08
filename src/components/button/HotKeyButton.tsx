import HotKeys, { HotKeysProps } from '@douyinfe/semi-ui/lib/es/hotKeys';
import HoverButton from './HoverButton';

export type HotKeyButtonProps = React.PropsWithChildren & {
  icon?: React.ReactNode;
  hotKeys?: HotKeysProps['hotKeys'];
  onHotKey?: HotKeysProps['onHotKey'];
};

const HotKeyButton: React.FC<HotKeyButtonProps> = ({
  icon,
  hotKeys,
  onHotKey,
  children,
}) => {
  return (
    <div
      {...event}
      className="semi-navigation-item-normal semi-navigation-item flex flex-row gap-2 items-center"
    >
      {icon}
      {children}
      <HotKeys
        hotKeys={hotKeys}
        onHotKey={onHotKey}
        preventDefault
        className="ml-auto"
      />
    </div>
  );
};

export default HotKeyButton;
