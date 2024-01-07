import { cookies } from "next/headers";

interface FetchServerProps<T> {
  endpoint: string;
  method: "POST" | "GET" | "PATCH" | "DELETE";
  body?: T;
  noToken?: boolean;
}

export const fetchServer = async <T, U>({
  endpoint,
  method,
  body,
  noToken,
}: FetchServerProps<T>): Promise<U | null> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (!noToken) {
    const cookiesHandler = cookies();
    const token = cookiesHandler.get('token')?.value;
    headers["authorization"] = "Bearer " + token;
  }
  try {
    const response = await fetch(`${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    return null;
  }
};
