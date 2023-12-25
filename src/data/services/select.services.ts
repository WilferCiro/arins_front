import { fetchClient } from "../client/fetchClient";

interface Props {
  services: {
    endpoint: string;
    params: string[];
  }[];
}

interface SelectValuesInterface {
  label: string;
  value: string;
}

export const getSelectData = async ({
  services,
}: Props): Promise<{ [key: string]: SelectValuesInterface[] }> => {
  const data: { [key: string]: SelectValuesInterface[] } = {};
  await Promise.all(
    services.map(async (service) => {
      const d = await fetchClient<null, SelectValuesInterface[] | null>({
        endpoint: `${service.endpoint}/select?search=`,
        method: "GET",
      });
      data[service.endpoint] = d || [];
      return null;
    })
  );

  return data;
};

interface PropsSearch {
  endpoint: string;
  search: string;
}

export const getSearchSelectData = async <T extends object>({
  endpoint,
  search,
}: PropsSearch): Promise<T[] | null> => {
  const data = await fetchClient<null, T[] | null>({
    endpoint: `${endpoint}?search=${search.toString()}`,
    method: "GET",
  });

  return data;
};
