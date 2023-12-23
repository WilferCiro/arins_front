import { appConfig } from "@/data/config/app_config";
import CrudTable from "@/presentation/components/organisms/CrudTable";

const DependenciesView = () => {
  return (
    <>
      <CrudTable
        columns={[]}
        endpoint={"dependencies"}
        server={appConfig.API_BACKEND_URL}
        filterForm={undefined}
      />
    </>
  );
};

export default DependenciesView;
