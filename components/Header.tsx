'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Badge from './Badge';
import SignupBtn from './SignupBtn';

const Header = () => {
  const { status } = useSession();

  const signOutHandler = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-20 w-full bg-black text-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold hover:text-primary-light">
            Logo
          </span>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Badge />
            </li>

            <li className="flex h-7 items-center justify-center">
              {status === 'authenticated' && (
                <>
                  <Link
                    className="rounded-md bg-primary px-6 py-2 hover:bg-primary-dark"
                    href="/orders"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={signOutHandler}
                    className="nav-btn"
                    type="button"
                  >
                    Logout
                  </button>
                </>
              )}

              {status === 'unauthenticated' && <SignupBtn />}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
