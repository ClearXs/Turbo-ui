import React from 'react';

export type IconButtonProps = React.DOMAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode;
  };

const IconButton: React.FC<IconButtonProps> = React.forwardRef<
  HTMLDivElement,
  IconButtonProps
>(({ icon, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={
        className +
        ' ' +
        'w-8 h-8 line-height-4 cursor-pointer hover:bg-[var(--semi-color-fill-0)] flex items-center justify-center'
      }
    >
      {icon}
    </div>
  );
});

export default IconButton;
