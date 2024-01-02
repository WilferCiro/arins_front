import { SaleAddSchema } from "@/domain/schemas/SaleSchema";
import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { StoreSchema } from "@/domain/schemas/StoreSchema";

const endpoint = `${appConfig.API_BACKEND_URL}/sales`;

export async function addSaleService(
  data: SaleAddSchema
): Promise<StoreSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function exportSalesService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Dependencies.xlsx",
  });
}
