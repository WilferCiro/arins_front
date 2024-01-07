import { ProductSchema } from "./ProductSchema";
import { StoreSchema } from "./StoreSchema";

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
      iva: number;
    }[];
    date: Date;
  }[];
  orders: {
    description: string;
    price: number;
    date: Date;
  }[];

  store: StoreSchema;
  store_id: string;

  createdAt: Date;
}

export interface SaleAddSchema {
  initialMoney: number;
}

export interface SaleAddSaleSchema {
  sale_id: string;
  products: {
    _id: string;
    quantity: number;
  }[];
}

export interface SaleOrderAddSchema {
  price: number;
  description?: string;
  sale_id: string;
}

export interface SaleActiveSchema {
  store: {
    _id: string;
    name: string;
  };
  active: boolean;
  sale?: string;
}
