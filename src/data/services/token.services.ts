"use client";
import { jwtDecode } from "jwt-decode";
import constantStore from "../constantStore";
import { TokenSchema } from "@/domain/schemas/TokenSchema";

export const getTokenData = (
  cookies?: { name: string; value: string }[]
): TokenSchema | null => {
  const token = constantStore.token.get(cookies);
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token) as TokenSchema;
  return decoded;
};
