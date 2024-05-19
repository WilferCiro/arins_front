import {
  SaleActiveSchema,
  SaleAddSaleSchema,
  SaleAddSchema,
  SaleOrderAddSchema,
  SaleSchema,
} from "@/domain/schemas/SaleSchema";
import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";

const endpoint = `${appConfig.API_BACKEND_URL}/sales`;

export async function getSaleByIdService(
  id: string
): Promise<SaleSchema | null> {
  return await fetchClient({
    endpoint: endpoint + "/" + id,
    method: "GET",
  });
}

export async function getCompleteSaleByIdService(
  id: string
): Promise<SaleSchema | null> {
  return await fetchClient({
    endpoint: endpoint + "/" + id + "/complete",
    method: "GET",
  });
}

export async function getActiveSalesService(): Promise<
  SaleActiveSchema[] | null
> {
  return await fetchClient({
    endpoint: endpoint + "/active",
    method: "GET",
  });
}

export async function addSaleService(
  data: SaleAddSchema
): Promise<SaleSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function createSaleSaleService(
  data: SaleAddSaleSchema
): Promise<SaleSchema | null> {
  return await fetchClient({
    endpoint: endpoint + "/subsale",
    method: "POST",
    body: { ...data },
  });
}

export async function addSaleOrderService(
  data: SaleOrderAddSchema
): Promise<SaleSchema | null> {
  return await fetchClient({
    endpoint: endpoint + "/order",
    method: "POST",
    body: { ...data },
  });
}

export async function exportSalesService(
  filters: Record<string, string> | undefined
): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Ventas.xlsx",
    body: filters,
  });
}

export async function exportSalesRowService(_id: string): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export/${_id}`,
    method: "POST",
    isFile: true,
    fileName: "Ventas.xlsx",
  });
}
