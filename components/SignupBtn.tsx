'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { actions } from '@/store/features/cart';
import SignupForm from './SignupForm';

const SignupBtn = () => {
  const { isShownForm } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(actions.toggleShowForm());
  };

  useEffect(() => {
    dispatch(actions.initializeCart());
  }, [dispatch]);

  return (
    <>
      {isShownForm && <SignupForm />}
      <button onClick={handleOpen} className="nav-btn" type="button">
        Sign up
      </button>
    </>
  );
};

export default SignupBtn;
