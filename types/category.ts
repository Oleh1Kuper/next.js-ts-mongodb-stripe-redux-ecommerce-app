export interface Category {
  _id: string;
  _type: string;
  image: string;
  name: string;
  slug: {
    current: string;
  };
  subtitle: string;
}
