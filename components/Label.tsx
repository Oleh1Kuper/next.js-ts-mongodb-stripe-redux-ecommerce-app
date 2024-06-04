import React from 'react';

type Props = {
  children: React.ReactNode;
  htmlFor: string;
}

const Label: React.FC<Props> = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-bold text-gray-700"
    >
      {children}
    </label>
  );
};

export default Label;
