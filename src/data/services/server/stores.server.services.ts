import { appConfig } from "@/data/config/app_config";
import { fetchServer } from "../../server/fetchServer";
import { StoreSchema } from "@/domain/schemas/StoreSchema";

const endpoint = `${appConfig.API_BACKEND_URL}/stores`;

export async function getOwnStoresServiceServer(): Promise<
  StoreSchema[] | null
> {
  return await fetchServer({
    endpoint: endpoint,
    method: "GET",
  });
}
