
export type Car = {
  id: number;
  name: string;
  route: string;
  price: number;
  originalPrice?: number;
  image: string;
  seats: string;
  badge?: string;
  badgeColor?: "red" | "blue" | "green" | "orange";
  features: string[];
};
