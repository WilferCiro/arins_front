import crypto from "crypto";
import { appConfig } from "../config/app_config";

const encryptWithPublicKey = () => {
  const data = `${appConfig.KEY_KEYWORD}-${new Date().getMinutes()}`;
  const bufferData = Buffer.from(data, "utf8");
  const bufferPublicKey = Buffer.from(appConfig.PUBLIC_KEY, "utf8");

  const encryptedData = crypto.publicEncrypt(
    {
      key: bufferPublicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    bufferData
  );
  return encryptedData.toString("base64");
};

export const encryptedApiKey = encryptWithPublicKey;
