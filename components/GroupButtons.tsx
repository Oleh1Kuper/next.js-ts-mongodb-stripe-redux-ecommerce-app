'use client';

import React, { useState } from 'react';
import { Game } from '@/types/game';
import { FaShoppingCart } from 'react-icons/fa';
import { useAppDispatch } from '@/store/hooks';
import { actions } from '@/store/features/cart';
import Button from './Button';

type Props = {
  game: Game;
};

const GroupButtons: React.FC<Props> = ({ game }) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    if (!quantity) return;

    setQuantity((prev) => prev - 1);
    setPrice((quantity - 1) * +game.price.toFixed(2));
  };

  const handleIncrease = () => {
    if (quantity > game.quantity) return;

    setQuantity((prev) => prev + 1);
    setPrice((quantity + 1) * +game.price.toFixed(2));
  };

  const addItemCart = () => {
    dispatch(actions.addCart({ ...game, quantity }));
  };

  return (
    <div className="mt-7 flex items-center space-x-4">
      <Button handleClick={handleDecrease} isDisable={quantity === 0}>
        -
      </Button>
      <span className="mx-auto rounded border border-gray-300 p-2 text-white">
        {quantity}
      </span>
      <Button
        handleClick={handleIncrease}
        isDisable={game.quantity === quantity}
      >
        +
      </Button>
      <p className="text-xl text-primary-light">{`$${price}`}</p>

      <Button handleClick={addItemCart} isDisable={quantity === 0}>
        <FaShoppingCart />
      </Button>
    </div>
  );
};

export default GroupButtons;
