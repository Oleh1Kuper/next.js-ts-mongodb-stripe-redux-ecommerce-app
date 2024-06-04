'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { actions } from '@/store/features/cart';

const Badge = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(actions.toggleCart());
  };

  return (
    <button
      onClick={handleClick}
      className="relative hover:text-primary-light"
      type="button"
    >
      <span>
        Cart
        <AiOutlineShoppingCart className="inline-block text-3xl" />
      </span>
      {!cartItems.length || (
        <span
          className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center
          justify-center rounded-full border-2 border-white bg-primary text-xs
          font-bold text-white"
        >
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

export default Badge;
