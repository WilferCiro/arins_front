import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { AssetSchema } from "@/domain/schemas/AssetSchema";

const endpoint = `${appConfig.API_BACKEND_URL}/assets`;

export async function addAssetService(
  data: AssetSchema
): Promise<AssetSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function editAssetService(
  data: Partial<AssetSchema>
): Promise<AssetSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "PATCH",
    body: { ...data, _id: undefined },
  });
}

export async function deleteAssetService(
  data: Partial<AssetSchema>
): Promise<AssetSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "DELETE",
  });
}

export async function exportAssetService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Assets.xlsx",
  });
}
