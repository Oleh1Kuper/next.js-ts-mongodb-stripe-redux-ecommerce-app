import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  register: UseFormRegisterReturn ;
  type: 'email' | 'password';
};

const Input: React.FC<Props> = ({ register, type }) => {
  return (
    <input
      type={type}
      className="input"
      id={type}
      placeholder={`Enter your ${type}`}
      {...register}
    />
  );
};

export default Input;
