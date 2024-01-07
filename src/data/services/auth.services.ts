import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { encryptedApiKey } from "./secure.services";

const endpoint = appConfig.API_BACKEND_URL;

export interface LoginServiceProps {
  email: string;
  password: string;
}

export const signInService = async ({
  email,
  password,
}: LoginServiceProps): Promise<{ token: string }> => {
  return (await fetchClient({
    endpoint: `${endpoint}/auth/login`,
    method: "POST",
    customHeaders: {
      "X-api-key": encryptedApiKey(),
    },
    body: { email, password },
  })) as { token: string };
};

export interface SignUpServiceProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const signUpService = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpServiceProps): Promise<{ token: string }> => {
  return (await fetchClient({
    endpoint: `${endpoint}/auth/signup`,
    method: "POST",
    customHeaders: {
      "X-api-key": encryptedApiKey(),
    },
    body: { email, password, firstName, lastName },
  })) as { token: string };
};

export const refetchTokenService = async (
  company_id?: string
): Promise<{ token: string }> => {
  return (await fetchClient({
    endpoint: `${endpoint}/auth/refetch`,
    method: "POST",
    //customHeaders: {
    // "api-key": appConfig.API_KEY_LOGIN,
    //},
    body: { company_id },
  })) as { token: string };
};
