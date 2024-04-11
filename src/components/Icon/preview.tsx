import { tryGetIcon } from '@/components/Icon/shared';
import IconList, { IconViewProps } from '@/pages/developer/icon';
import { IconCamera } from '@douyinfe/semi-icons';
import { Avatar, Modal } from '@douyinfe/semi-ui';

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
      alt="Alice Swift"
      size="small"
      shape="square"
      onClick={() => {
        if (disabled) {
          return;
        }
        const modal = Modal.info({
          size: 'medium',
          title: 'Icon Resources',
          content: (
            <IconList
              chooseIcon={(key) => {
                onChooseIcon?.(key);
                modal.destroy();
              }}
              showName={false}
              splitNum={3}
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
