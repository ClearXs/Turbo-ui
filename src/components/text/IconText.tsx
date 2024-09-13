import { Typography } from '@douyinfe/semi-ui';
import { TextProps } from '@douyinfe/semi-ui/lib/es/typography';
import React from 'react';

export type IconTextProps = TextProps & {
  children: React.ReactNode;
  icon: React.ReactNode;
  gap?: number;
};

const IconText: React.FC<IconTextProps> = ({
  icon,
  gap = 1,
  children,
  ...props
}) => {
  return (
    <div className="flex align-baseline" style={{ gap }}>
      {icon}
      <Typography.Text {...props}>{children}</Typography.Text>
    </div>
  );
};

export default IconText;
