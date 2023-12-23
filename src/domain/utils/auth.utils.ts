import { appConfig } from "@/data/config/app_config";

export const checkIsAdmin = (account: string) => {
  if (account && appConfig.ADMIN_ACCOUNTS.includes(account)) {
    return true;
  }
  return false;
};
