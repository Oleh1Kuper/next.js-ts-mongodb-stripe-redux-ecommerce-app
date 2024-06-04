import React from 'react';
import Hero from '@/components/Hero';
import { fetchOrder } from '@/libs/api';
import { options } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Table from '@/components/Table';

const Orders = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/');
  }

  const orders = await fetchOrder(session?.user?.email as string);

  return (
    <div>
      <Hero />

      <div className="relative overflow-x-auto px-6 pb-40 sm:px-12 md:px-20 lg:px-36">
        <Table orders={orders} />
      </div>
    </div>
  );
};

export default Orders;
