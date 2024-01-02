import { ProductSchema } from "./ProductSchema";

export interface SaleSchema {
  _id?: string;

  initialMoney: number;
  sales: {
    products: {
      original: ProductSchema;
      original_id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    date: Date;
  }[];
  orders: {
    description: string;
    price: number;
    date: Date;
  }[];

  createdAt: Date;
}

export interface SaleAddSchema {
  initialMoney: number;
}
