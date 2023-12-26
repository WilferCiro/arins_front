import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { StoreSchema } from "@/domain/schemas/StoreSchema";

const endpoint = `${appConfig.API_BACKEND_URL}/stores`;

export async function addStoreService(
  data: StoreSchema
): Promise<StoreSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function editStoreService(
  data: Partial<StoreSchema>
): Promise<StoreSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "PATCH",
    body: { ...data, _id: undefined },
  });
}

export async function deleteStoreService(
  data: Partial<StoreSchema>
): Promise<StoreSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "DELETE",
  });
}

export async function exportStoreService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Dependencies.xlsx",
  });
}
