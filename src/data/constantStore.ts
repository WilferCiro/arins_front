import Cookie from "js-cookie";

const keyList = {
  TOKEN: "token",
  THEME: "theme",
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

const getCookieFromDocument = (key: string): string | null => {
  const cookieString = document.cookie;
  const keyPattern = new RegExp(`${key}=([^;]*)`);
  const keyMatch = cookieString.match(keyPattern);
  if (keyMatch && keyMatch.length > 1) {
    return keyMatch[1];
  } else {
    return null;
  }
};

const getItem = (key: string, cookies?: { name: string; value: string }[]) => {
  let item = Cookie.get(key);
  if (!item && cookies) {
    item = cookies.find((cookie) => cookie.name === key)?.value;
  }
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
    get: (cookies?: { name: string; value: string }[]) =>
      getItem(keyList.TOKEN, cookies),
    set: (token: string) => setItem<string>(keyList.TOKEN, token),
    remove: () => removeItem(keyList.TOKEN),
  },
  theme: {
    get: () => getItem(keyList.THEME),
    set: (theme: string) => setItem<string>(keyList.THEME, theme),
  },
});

export default ConstantStore();
