import { UserSchema } from "@/domain/schemas/UserSchema";
import Cookie from "js-cookie";
import CryptoJS from "crypto-js";

const keyList = {
  TOKEN: "token",
  THEME: "theme",
  USER: "user",
};

export const encrypt = (data: string) => {
  return data;
  // return CryptoJS.AES.encrypt(JSON.stringify(data), secretPass).toString();
};
export const decrypt = (data: string) => {
  return data;
  // const bytes = CryptoJS.AES.decrypt(data, secretPass);
  // return bytes.toString(CryptoJS.enc.Utf8);
};

const getItem = (key: string) => {
  let item = Cookie.get(key);
  if (!item) {
    return undefined;
  }
  const data = decrypt(item);
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const setItem = <T>(key: string, value: T | string) => {
  let valueSave =
    typeof value === "string" ? (value as string) : JSON.stringify(value);
  valueSave = encrypt(valueSave);
  Cookie.set(key, valueSave, { sameSite: "strict" });
};

const removeItem = (key: string) => Cookie.remove(key);

const ConstantStore = () => ({
  token: {
    get: () => getItem(keyList.TOKEN),
    set: (token: string) => setItem<string>(keyList.TOKEN, token),
    remove: () => removeItem(keyList.TOKEN),
  },
  theme: {
    get: () => getItem(keyList.THEME),
    set: (theme: string) => setItem<string>(keyList.THEME, theme),
  },
});

export default ConstantStore();
