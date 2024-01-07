import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { ProductSchema } from "@/domain/schemas/ProductSchema";

const endpoint = `${appConfig.API_BACKEND_URL}/Products`;

export async function addProductService(
  data: ProductSchema
): Promise<ProductSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}
export async function addMassiveProductService(
  data: ProductSchema[]
): Promise<number | null> {
  return await fetchClient({
    endpoint: endpoint + "/massive",
    method: "POST",
    body: { assets: data },
  });
}

export async function editProductService(
  data: Partial<ProductSchema>
): Promise<ProductSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "PATCH",
    body: { ...data, _id: undefined },
  });
}

export async function deleteProductService(
  data: Partial<ProductSchema>
): Promise<ProductSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "DELETE",
  });
}

export async function exportProductService(
  filters: Record<string, string> | undefined
): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Productos.xlsx",
    body: filters,
  });
}

export async function getProductByStoreService(
  store_id: string
): Promise<ProductSchema[] | null> {
  return await fetchClient({
    endpoint: endpoint + "/store/" + store_id,
    method: "GET",
  });
}
