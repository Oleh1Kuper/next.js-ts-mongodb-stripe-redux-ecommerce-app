import React from 'react';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-20 w-full bg-black text-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold hover:text-primary-light">
          Logo
        </Link>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
