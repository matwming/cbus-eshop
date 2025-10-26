export type Product = {
  category: Category;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: { rate: number; count: number };
};

export type CartItem = Product & { quantity: number };

//this is usually from the api
export const ALL_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
] as const;

export type Category = (typeof ALL_CATEGORIES)[number];
