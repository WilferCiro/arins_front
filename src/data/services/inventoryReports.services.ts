import { fetchClient } from "../client/fetchClient";
import { appConfig } from "../config/app_config";

const endpoint = `${appConfig.API_BACKEND_URL}/inventoryReports`;

interface PropsReport {
  type: string;
}

export async function generateReportInventory({
  type,
}: PropsReport): Promise<null> {
  return await fetchClient({
    endpoint: endpoint + "/generate",
    method: "POST",
    isFile: true,
    fileName: "Assets.xlsx",
    body: { type },
  });
}
