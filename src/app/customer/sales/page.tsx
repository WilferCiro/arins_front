import { getOwnStoresServiceServer } from "@/data/services/server/stores.server.services";
import SalesView from "@/presentation/components/pages/customer/Sales/SalesView";

export const metadata = {
  title: "Arins :: Listado de ventas",
};

const SalesPage = async () => {

  const stores = await getOwnStoresServiceServer();

  return (
    <>
      <SalesView stores={stores} />
    </>
  );
};

export default SalesPage;
