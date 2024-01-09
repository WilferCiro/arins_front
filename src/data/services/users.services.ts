import { UserPasswordSchema, UserSchema } from "@/domain/schemas/UserSchema";
import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";

const endpoint = `${appConfig.API_BACKEND_URL}/users`;

export async function getProfileDataService(): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: endpoint + "/profile",
    method: "GET",
  });
}

export async function addUserService(
  data: UserSchema
): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data },
  });
}

export async function editUserService(
  data: Partial<UserSchema>
): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "PATCH",
    body: { ...data, _id: undefined },
  });
}
export async function editUserPassword(
  data: UserPasswordSchema
): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/password`,
    method: "PATCH",
    body: { ...data },
  });
}

export async function deleteUserService(
  data: Partial<UserSchema>
): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data._id}`,
    method: "DELETE",
  });
}

export async function exportUserService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "Users.xlsx",
  });
}
