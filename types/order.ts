export interface Order {
  _createdAt: string;
  _id: string;
  items: [
    {
      _key: string;
      game: {
        _id: string;
        name: string;
        price: number;
        images: Array<{ _key: string; url: string }>;
        slug: {
          current: string;
        };
      };
      quantity: number;
    },
  ];
  orderStatus: string;
}
