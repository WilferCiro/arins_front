import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";

interface ReqMessageProps {
  address: `0x${string}`;
  chain: number;
  network: string;
}

export const requestMessage = async (body: ReqMessageProps) => {
  return await fetchClient({
    endpoint: "http://localhost:3000/api/auth/request-message",
    method: "POST",
    body,
  });
};

const endpoint = appConfig.API_BACKEND_URL;

export const signInService = async (
  address: `0x${string}`
): Promise<{ token: string }> => {
  return (await fetchClient({
    endpoint: `${endpoint}/auth/token`,
    method: "POST",
    customHeaders: {
      'api-key': appConfig.API_KEY_LOGIN
    },
    body: { address },
  })) as { token: string };
};
