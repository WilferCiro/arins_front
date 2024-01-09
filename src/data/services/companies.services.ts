import { CompanyAccessSchema, CompanySchema } from "@/domain/schemas/CompanySchema";
import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";

const endpoint = `${appConfig.API_BACKEND_URL}/companies`;

export async function addCompanyService(
  data: CompanySchema
): Promise<CompanySchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function editCompanyService(
  data: Partial<CompanySchema>
): Promise<CompanySchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "PATCH",
    body: { ...data, _id: undefined },
  });
}

export async function deleteCompanyService(
  data: Partial<CompanySchema>
): Promise<CompanySchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "DELETE",
  });
}

export async function exportCompanyService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Companies.xlsx",
  });
}

export async function getAccessCompanyService(): Promise<CompanyAccessSchema | null> {
  return await fetchClient({
    endpoint: endpoint + "/access",
    method: "GET",
  });
}
export async function getCurrentCompanyDataService(): Promise<CompanySchema | null> {
  return await fetchClient({
    endpoint: endpoint + "/current",
    method: "GET",
  });
}
