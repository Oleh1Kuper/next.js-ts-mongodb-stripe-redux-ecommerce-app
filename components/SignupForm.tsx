'use client';

import React, { useState } from 'react';
import { actions } from '@/store/features/cart';
import { useAppDispatch } from '@/store/hooks';
import { useForm } from 'react-hook-form';
import { schema } from '@/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [isLoad, setIsLoad] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(actions.toggleShowForm());
  };

  const handleClick = () => {
    setIsLogin((prev) => !prev);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoad(true);

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result?.error) {
        dispatch(actions.toggleShowForm());
        toast.success('Welcome!');
      } else {
        toast.error(`${result?.error}`);
      }

      setIsLoad(false);
    } else {
      try {
        const res = await axios.post('/api/sign-up', data);
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (!result?.error) {
          dispatch(actions.toggleShowForm());
        }

        toast.success(res.statusText);
        dispatch(actions.toggleShowForm());
      } catch (error) {
        const err = error as AxiosError;
        toast.error(`${err.response?.data}`);
      } finally {
        setIsLoad(false);
      }
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-40 flex h-screen w-full
      items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div
        className="translate-y-0 scale-100 transform rounded-lg
        bg-white p-8 shadow-lg transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl text-gray-900">
            {isLogin ? 'Sign in' : 'Sign up'}
          </h2>

          <IoCloseCircleOutline
            size={20}
            onClick={handleClose}
            className="cursor-pointer text-xs text-red-500"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="google-btn"
          >
            <span>Login with Google</span>
            <FcGoogle className="h-6 w-6" />
          </button>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              className="input"
              id="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email?.message && (
              <span className="block text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              className="input"
              id="password"
              placeholder="Enter your Password"
              {...register('password')}
            />
            {errors.password?.message && (
              <span className="block text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="">
            <button className="nav-btn m-0 w-full" type="submit">
              {isLoad ? 'Loading...' : isLogin ? 'Login' : 'Create account'}
            </button>
            <button
              onClick={handleClick}
              className="mt-3 text-gray-900 underline underline-offset-1"
              type="button"
            >
              {!isLogin ? 'Login with existing account' : 'Create a new one'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
