import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";

interface PaginatedInterface<T> {
  data: T[];
  total: number;
  cursor: string;
}

interface Props {
  endpoint: string;
  server: string;
  page: number;
  count: number;
  filters: Record<string, string> | undefined;
}

export const getPaginatedData = async <T>({
  server,
  endpoint,
  page,
  count,
  filters,
}: Props): Promise<PaginatedInterface<T> | null> => {
  const params: Record<string, string> = {
    page: `${page - 1}` || "0",
    count: `${count}` || "10",
    ...filters,
  };

  const data = await fetchClient<null, PaginatedInterface<T> | null>({
    endpoint: `${server}/${endpoint}/paginated`,
    method: "GET",
    params,
  });

  return data;
};
