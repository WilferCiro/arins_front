import { appConfig } from "@/data/config/app_config";
import { fetchServer } from "../../server/fetchServer";
import { CompanyAccessSchema } from "@/domain/schemas/CompanySchema";

const endpoint = `${appConfig.API_BACKEND_URL}/companies`;

export async function getAccessCompanyServiceServer(): Promise<CompanyAccessSchema | null> {
  return await fetchServer({
    endpoint: endpoint + "/access",
    method: "GET",
  });
}
