import { StoreSchema } from "./StoreSchema";

export interface ProductSchema {
  _id?: string;
  name: string;
  description: string;
  barcode: string;
  price: number;
  quantity: number;
  presentation: string;
  store: StoreSchema;
  store_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
