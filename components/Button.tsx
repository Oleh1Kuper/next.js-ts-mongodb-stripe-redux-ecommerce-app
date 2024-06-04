import React from 'react';

type Props = {
  children: React.ReactNode;
  isDisable?: boolean;
  handleClick?: () => void;
  className?: string;
  type?: 'submit' | 'button';
};

const Button: React.FC<Props> = ({
  children,
  isDisable,
  className,
  type,
  handleClick = () => {},
}) => {
  return (
    <button
      onClick={handleClick}
      type={type ? 'submit' : 'button'}
      className={`button ${className}
      ${isDisable && 'cursor-not-allowed'}`}
      disabled={isDisable}
    >
      {children}
    </button>
  );
};

export default Button;
