'use client';

import React from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RiCloseLine } from 'react-icons/ri';
import { actions } from '@/store/features/cart';
import { IoCloseOutline } from 'react-icons/io5';
import { getStripe } from '@/libs/stripe';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Button from './Button';

const Cart = () => {
  const { isShownCart, cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const totalAmount = cartItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0,
  );
  const { data: session } = useSession();

  const handleRemove = (id: string) => () => {
    dispatch(actions.removeCart(id));
  };

  const toggleCart = () => {
    dispatch(actions.toggleCart());
  };

  const checkoutHandler = async () => {
    const stripe = await getStripe();

    const res = await axios.post('/api/stripe', { cartItems, userEmail: session?.user?.email });

    if (!res.data) return;

    localStorage.removeItem('cart');
    stripe?.redirectToCheckout({ sessionId: res.data.id });
  };

  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-screen w-4/5
      transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-1/3
      ${isShownCart ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between bg-gray-200 px-4 py-2">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button
          aria-hidden
          type="button"
          className="text-gray-600 hover:text-gray-800"
          onClick={toggleCart}
        >
          <IoCloseOutline />
        </button>
      </div>

      <div className="flex flex-col border-b p-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center border-b py-2">
            <Image
              width={100}
              height={100}
              src={item.image[0].url}
              alt={item.name}
              className="mr-4 h-12 w-12 object-cover"
            />

            <div className="flex-1">
              <h3 className="text-sm font-medium md:text-base">{item.name}</h3>
              <p className="text-gray-600">{`$ ${item.price.toFixed(2)}`}</p>
            </div>

            <div className="flex items-center">
              <span className="px-2">{item.quantity}</span>

              <button
                aria-hidden
                type="button"
                onClick={handleRemove(item._id)}
                className="ml-2 flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-600"
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!cartItems.length || (
        <>
          <div className="flex items-center justify-between bg-gray-200 px-4 py-2">
            <span className="text-gray-600">Total amount</span>
            <span className="font-semibold">{`$${totalAmount}`}</span>
          </div>

          <div className="px-4 mt-4">
            <Button
              handleClick={checkoutHandler}
              className="w-full"
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Cart;
