import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { DependencySchema } from "@/domain/schemas/DependencySchema";

const endpoint = `${appConfig.API_BACKEND_URL}/dependencies`;

export async function addDependencyService(
  data: DependencySchema
): Promise<DependencySchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function editDependencyService(
  data: Partial<DependencySchema>
): Promise<DependencySchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "PATCH",
    body: { ...data, _id: undefined },
  });
}

export async function deleteDependencyService(
  data: Partial<DependencySchema>
): Promise<DependencySchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "DELETE",
  });
}

export async function exportDependencyService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Dependencies.xlsx",
  });
}
