import CertSchema, { CertificateResponse } from "@/domain/schemas/CertSchema";
import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";
import { string } from "yup";

const endpoint = appConfig.API_BACKEND_URL;

export const generateCert = async ({ address, tokenURI }: CertSchema) => {
  return (await fetchClient({
    endpoint: `${endpoint}/certificates/mint`,
    method: "POST",
    hasToken: true,
    body: { address, tokenURI },
  })) as CertificateResponse;
};

interface EditionInterface extends CertSchema {
  fromAddress: string;
}
// EDITION
export const updateCert = async ({
  address,
  tokenURI,
  tokenId,
  fromAddress,
}: EditionInterface) => {
  return (await fetchClient({
    endpoint: `${endpoint}/certificates/safe-transfer`,
    method: "PATCH",
    hasToken: true,
    body: {
      to: address,
      from: fromAddress,
      tokenURI,
      tokenId,
    },
  })) as CertificateResponse;
};
