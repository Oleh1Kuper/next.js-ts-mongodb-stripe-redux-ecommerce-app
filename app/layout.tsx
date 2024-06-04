import React from 'react';
import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppProvider from '@/store/AppProvider';
import Cart from '@/components/Cart';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Toast from '@/components/Toast';
import AuthProvider from '@/components/AuthProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Ecommerce App',
  description: 'Selling games online',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={` ${montserrat.variable} ${poppins.variable}`}>
      <body>
        <Toast />
        <AppProvider>
          <AuthProvider>
            <Header />
            <Cart />
            <main className="min-h-screen bg-primary-gradiant">{children}</main>
            <Footer />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
