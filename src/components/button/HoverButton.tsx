import { useState } from 'react';

export type HoverButtonProps = React.PropsWithChildren & {
  icon?: React.ReactNode;
  hover?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const HoverButton: React.FC<HoverButtonProps> = ({
  icon,
  hover,
  children,
  ...event
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      {...event}
      className="semi-navigation-item-normal semi-navigation-item flex flex-row gap-2 items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      {children}
      {isHovered && hover}
    </div>
  );
};

export default HoverButton;
