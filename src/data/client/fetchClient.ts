// Mantine
import { notifications } from "@mantine/notifications";
import constantStore from "../constantStore";

interface FetchClientProps<T> {
  endpoint: string;
  method: "POST" | "GET" | "PATCH" | "DELETE";
  body?: T;
  params?: Record<string, string>;
  isFile?: boolean;
  fileName?: string;
  customHeaders?: any;
  noToken?: boolean;
}

export const fetchClient = async <T, U>({
  endpoint,
  method,
  body,
  params,
  isFile,
  fileName,
  customHeaders,
  noToken,
}: FetchClientProps<T>): Promise<U | null> => {
  const headers: any = {
    "Content-Type": "application/json",
    ...(customHeaders || {}),
  };
  if (noToken !== true || noToken === undefined) {
    const token = constantStore.token.get();
    headers["authorization"] = "Bearer " + token;
  }
  let newEndpoint = endpoint;
  if (params) {
    newEndpoint = `${endpoint}` + "?" + new URLSearchParams(params).toString();
  }
  try {
    const response = await fetch(`${newEndpoint}`, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    if (isFile) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "file");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return null;
    }
    const json = await response.json();
    return json;
  } catch (e) {
    notifications.show({
      message: `${e}`,
      color: "red",
    });
    return null;
  }
};
