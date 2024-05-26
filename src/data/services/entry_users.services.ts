import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { EntryUserSchema } from "@/domain/schemas/EntryUserSchema";

const endpoint = `${appConfig.API_BACKEND_URL}/userEntry`;

export async function addEntryUserService(
  data: EntryUserSchema
): Promise<EntryUserSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function editEntryUserService(
  data: Partial<EntryUserSchema>
): Promise<EntryUserSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "PATCH",
    body: { ...data, _id: undefined },
  });
}

export async function deleteEntryUserService(
  data: Partial<EntryUserSchema>
): Promise<EntryUserSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "DELETE",
  });
}

export async function exportEntryUserService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Users.xlsx",
  });
}
