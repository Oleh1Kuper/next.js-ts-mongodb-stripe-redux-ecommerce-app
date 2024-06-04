import { createOrder, updateGameQuantity } from '@/libs/api';
import client from '@/libs/sanity';
import { Game, GameSubset } from '@/types/game';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: Request) => {
  const { cartItems, userEmail } = await req.json();
  const origin = req.headers.get('origin');

  const updatedItems = (await calculateItemsPrice(cartItems)) as GameSubset[];

  try {
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
      line_items: updatedItems.map((item) => ({
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          maximum: item.maxQuantity,
          minimum: 1,
        },
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image[0].url],
          },
          unit_amount: item.price * 100,
        },
      })),
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      phone_number_collection: { enabled: true },
    });

    await updateGameQuantity(updatedItems);
    await createOrder(updatedItems, userEmail);

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

async function calculateItemsPrice(cartItems: Game[]) {
  const query = `*[_type=='game' && _id in $itemIds] {
    _id,
    name,
    price,
    quantity,
    image,
  }`;

  try {
    const itemIds = cartItems.map((cart) => cart._id);
    const sanityItems: GameSubset[] = await client.fetch({
      query,
      params: { itemIds },
    });

    const updatedItems = sanityItems.map((item) => ({
      ...item,
      maxQuantity: item.quantity,
    }));

    if (checkQuantity(cartItems, updatedItems)) {
      return NextResponse.json('Quantity has been updated, update your cart', {
        status: 500,
      });
    }

    const calculatedPrices = updatedItems.map((item) => {
      const cart = cartItems.find((c) => c._id === item._id);

      return {
        ...item,
        quantity: cart?.quantity,
      };
    });

    return calculatedPrices;
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

function checkQuantity(cartItems: Game[], sanityItems: GameSubset[]) {
  for (let i = 0; i < cartItems.length; i += 1) {
    const cartItem = cartItems[i];
    const sanityItem = sanityItems[i];

    if (cartItem.quantity <= sanityItem.quantity) return false;
  }

  return true;
}
