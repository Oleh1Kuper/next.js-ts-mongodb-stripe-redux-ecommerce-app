'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { actions } from '@/store/features/cart';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useSession, signOut } from 'next-auth/react';
import Button from './Button';
import Badge from './Badge';
import SignupForm from './SignupForm';

const Nav = () => {
  const { status } = useSession();
  const { isShownForm } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(actions.toggleShowForm());
  };

  const signOutHandler = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(actions.initializeCart());
  }, [dispatch]);

  return (
    <>
      {isShownForm && <SignupForm />}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Badge />
          </li>

          <li className="flex h-7 items-center justify-center">
            {status === 'authenticated' && (
              <div className="flex gap-2">
                <Link
                  className="rounded-md bg-primary px-6 py-2 hover:bg-primary-dark"
                  href="/orders"
                >
                  Orders
                </Link>
                <Button handleClick={signOutHandler}>Logout</Button>
              </div>
            )}

            {status === 'unauthenticated' && (
              <Button handleClick={handleOpen}>Sign up</Button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
