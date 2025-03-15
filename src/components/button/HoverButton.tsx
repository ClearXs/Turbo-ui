import { useRef, useState } from 'react';

export type HoverButtonProps = React.DOMAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode;
    hover?: React.ReactNode;
  };

const HoverButton: React.FC<HoverButtonProps> = ({
  icon,
  hover,
  children,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>();
  return (
    <div
      {...props}
      ref={divRef}
      className={
        className +
        ' ' +
        'semi-navigation-item-normal semi-navigation-item flex flex-row gap-2 items-center'
      }
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
