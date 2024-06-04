import { Order } from '@/types/order';
import React from 'react';

type Props = {
  orders: Order[];
};

const Table: React.FC<Props> = ({ orders }) => {
  return (
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
          const totalPrice = order.items.reduce(
            (acc, curr) => acc + curr.quantity * curr.game.price,
            0,
          );

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
  );
};

export default Table;
