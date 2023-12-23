import { UserCertSchema } from "@/domain/schemas/UserCertSchema";
import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";

const endpoint = appConfig.API_BACKEND_URL;

export const getOwnNFTs = async (): Promise<UserCertSchema[]> => {
  return (await fetchClient({
    endpoint: `${endpoint}/nfts/own`,
    method: "GET",
    hasToken: true,
  })) as UserCertSchema[];
};

export const validateNFTs = async (body: {
  tokenId: string;
}): Promise<UserCertSchema> => {
  return (await fetchClient({
    endpoint: `${endpoint}/nfts/validate`,
    method: "POST",
    hasToken: true,
    body,
  })) as UserCertSchema;
};

export const getPaginatedNFTs = async (params: {
  cursor?: string;
  count?: number;
}) => {
  return await fetchClient({
    endpoint: `${endpoint}/nfts/paginated`,
    method: "GET",
    params,
  });
};
