import { jwtDecode } from "jwt-decode";

interface PropsDecoded {
  exp: number;
  id: number;
}

export const checkIsAuth = (token: any) => {
  if (!token) {
    return false;
  }
  try {
    const decoded: PropsDecoded | null = jwtDecode(token);
    if (decoded && Date.now() - decoded["exp"] < 0) {
      return true;
    }
  } catch (e: any) {}
  return false;
};
