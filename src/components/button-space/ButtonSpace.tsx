import { Space } from '@douyinfe/semi-ui';
import { ButtonSpaceProps } from './interface';

const ButtonSpace: React.FC<ButtonSpaceProps> = ({
  children,
  ...spaceProps
}) => {
  return (
    <Space className="ml-auto mr-2" {...spaceProps}>
      {children}
    </Space>
  );
};

export default ButtonSpace;
