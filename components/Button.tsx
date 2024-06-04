import React from 'react';

type Props = {
  children: React.ReactNode;
  isDisable: boolean;
  handleClick?: () => void;
};

const Button: React.FC<Props> = ({ children, isDisable, handleClick = () => {} }) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`rounded bg-blue-500 px-4 py-2 text-white
      ${isDisable && 'cursor-not-allowed bg-gray-300'}`}
      disabled={isDisable}
    >
      {children}
    </button>
  );
};

export default Button;
