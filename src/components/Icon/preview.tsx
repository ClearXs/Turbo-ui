import { tryGetIcon } from '@/components/icon/shared';
import { IconCamera } from '@douyinfe/semi-icons';
import { Avatar, Modal } from '@douyinfe/semi-ui';
import IconList, { IconViewProps } from './IconList';

export type IconProps = {
  icon?: string;
  disabled?: boolean;
  onChooseIcon?: IconViewProps['chooseIcon'];
};

const Icon: React.FC<IconProps> = ({
  icon,
  disabled = false,
  onChooseIcon,
}) => {
  return (
    <Avatar
      size="small"
      shape="square"
      onClick={() => {
        if (disabled) {
          return;
        }
        const modal = Modal.info({
          size: 'large',
          title: 'Icon Resources',
          content: (
            <IconList
              chooseIcon={(key) => {
                onChooseIcon?.(key);
                modal.destroy();
              }}
              splitNum={4}
            />
          ),
          footer: null,
        });
      }}
      hoverMask={
        !disabled && (
          <div
            style={{
              backgroundColor: 'var(--semi-color-overlay-bg)',
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconCamera />
          </div>
        )
      }
    >
      {tryGetIcon(icon)}
    </Avatar>
  );
};

export default Icon;
