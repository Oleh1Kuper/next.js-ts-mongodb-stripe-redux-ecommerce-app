import { Category } from '@/types/category';
import { Game, GameSubset } from '@/types/game';
import axios from 'axios';
import { Order } from '@/types/order';
import client from './sanity';

export const getCategories = async (): Promise<Category[]> => {
  const categories: Category[] = await client.fetch({
    query: "*[_type=='category']",
  });

  return categories;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const category: Category = await client.fetch({
    query: `*[_type=='category' && slug.current=='${slug}'][0]`,
  });

  return category;
};

export const getGames = async (): Promise<Game[]> => {
  const games: Game[] = await client.fetch({
    query: "*[_type=='game']",
  });

  return games;
};

export const getRecentGames = async (): Promise<Game[]> => {
  const games: Game[] = await client.fetch({
    query: "*[_type=='game'] | order(_createdAt desc)[0...4]",
  });

  return games;
};

export const getCategoryGames = async (slug: string): Promise<Game[]> => {
  const query = `*[_type=='game' && category->slug.current =='${slug}'] {
    name,
    _id,
    price,
    image,
    isFeatured,
    isTrending,
    slug,
    quantity,
    description,
    category->{
      name,
      subtitle
    }
  }`;

  const games: Game[] = await client.fetch({ query });

  return games;
};

export const getSingleGame = async (slug: string) => {
  const game: Game = await client.fetch({
    query: `*[_type=='game' && slug.current=='${slug}'][0]`,
  });

  return game;
};

export const updateGameQuantity = async (games: GameSubset[]) => {
  const mutation = {
    mutations: games.map(({ _id, maxQuantity, quantity }) => ({
      patch: {
        id: _id,
        set: {
          quantity: maxQuantity - quantity,
        },
      },
    })),
  };

  const res = await axios.post(
    `https://${process.env.SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } },
  );

  return res.data;
};

export const createOrder = async (games: GameSubset[], userEmail: string) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'order',
          userEmail,
          items: games.map((game, i) => ({
            game: {
              _key: i,
              _type: 'reference',
              _ref: game._id,
            },
            quantity: game.quantity,
          })),
          orderStatus: 'pending',
        },
      },
    ],
  };

  const res = await axios.post(
    `https://${process.env.SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } },
  );

  return res.data;
};

export const fetchOrder = async (userEmail: string) => {
  const query = `*[_type == 'order' && userEmail == $userEmail] {
    _id,
    items[] {
      _key,
      quantity,
      game -> {
        _id,
        name,
        price,
        images,
        slug {
          current
        },
        description
      }
    },
    orderStatus,
    _createdAt,
  }`;

  const params = { userEmail };
  const result: Order[] = await client.fetch({ query, params });

  return result;
};
