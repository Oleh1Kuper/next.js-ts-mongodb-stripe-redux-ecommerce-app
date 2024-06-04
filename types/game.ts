export interface Game {
  _id: string;
  description: string;
  image: Array<{ _key: string; url: string }>;
  isFeatured: boolean;
  isTranding: boolean;
  name: string;
  price: number;
  quantity: number;
  slug: { current: string };
}

export type GameSubset = Pick<
  Game,
  '_id' | 'image' | 'price' | 'name' | 'quantity'
> & { maxQuantity: number };
