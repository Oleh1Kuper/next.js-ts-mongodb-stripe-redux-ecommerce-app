import React from 'react';
import Hero from '@/components/Hero';
import { fetchOrder } from '@/libs/api';
import { options } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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
        <table className="text sm w-full text-left text-gray-400">
          <thead className="bg-gray-700 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-6 py-3">Product name</th>
              <th className="px-6 py-3">Unit Price</th>
              <th className="px-6 py-3">Order Status</th>
              <th className="px-6 py-3">Total Price</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const totalPrice = order.items
                .reduce((acc, curr) => acc + curr.quantity * curr.game.price, 0);

              return (
                <tr
                  key={order._id}
                  className="border-b border-gray-700 bg-gray-800"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                    {order.items.map((item) => (
                      <span className="block" key={item.game._id}>
                        {`${item.game.name} (${item.quantity})`}
                      </span>
                    ))}
                  </td>

                  <td className="px-6 py-4">
                    {order.items.map((item) => (
                      <span className="block" key={item.game._id}>
                        {`$${item.game.price}`}
                      </span>
                    ))}
                  </td>

                  <td className="px-6 py-4">{order.orderStatus}</td>
                  <td className="px-6 py-4">{`$${totalPrice}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
