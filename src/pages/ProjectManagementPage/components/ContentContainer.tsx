import { HTMLAttributes, ReactNode } from 'react';

interface ContentContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ContentContainer = ({
  children,
  className,
  ...props
}: ContentContainerProps): JSX.Element => {
  return (
    <div className={`mt-4 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export default ContentContainer;
