"use client";
import { appConfig } from "@/data/config/app_config";
import {
  getAssetsFormAdd,
  getAssetsFormEdit,
  getAssetsFormFilter,
} from "@/data/forms/assets.form";
import {
  getDependenciesFormAdd,
  getDependenciesFormEdit,
} from "@/data/forms/dependencies.form";
import {
  addAssetService,
  deleteAssetService,
  editAssetService,
} from "@/data/services/assets.services";
import {
  addDependencyService,
  editDependencyService,
} from "@/data/services/dependencies.services";
import { getAssetsTableDefinition } from "@/data/tables/assets.table";
import { getDependenciesTableDefinition } from "@/data/tables/dependencies.table";
import { AssetSchema } from "@/domain/schemas/AssetSchema";
import { DependencySchema } from "@/domain/schemas/DependencySchema";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { Divider } from "@mantine/core";
import { IconAsset, IconBuildingFortress } from "@tabler/icons-react";
import { useMemo } from "react";
import { useMutation } from "react-query";

const AssetsView = () => {
  const columns = useMemo(() => getAssetsTableDefinition(), []);
  const formAdd = useMemo(() => getAssetsFormAdd(), []);
  const formEdit = useMemo(() => getAssetsFormEdit(), []);
  const formFilter = useMemo(() => getAssetsFormFilter(), []);

  const mutationAdd = useMutation({
    mutationFn: addAssetService,
  });
  const mutationEdit = useMutation({
    mutationFn: editAssetService,
  });
  const mutationDelete = useMutation({
    mutationFn: deleteAssetService,
  });

  const onAdd = async (values: AssetSchema) => {
    values.dependency_id = "658738b4755b1badd755aaa9";
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (original: AssetSchema, values: AssetSchema) => {
    values._id = original._id;
    console.log(values);
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };

  const onDelete = async (original: AssetSchema): Promise<boolean> => {
    const res = await mutationDelete.mutateAsync({
      _id: original._id,
    });
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title={"Listado de activos"}
        subtitle="Administra los activos de {empresa}"
        icon={<IconAsset />}
      />
      <Divider m="lg" />
      <CrudTable<AssetSchema>
        columns={columns}
        endpoint={"assets"}
        server={appConfig.API_BACKEND_URL}
        filterForm={formFilter}
        fieldsForms={{
          add: formAdd,
          edit: formEdit,
        }}
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
          onDelete: onDelete,
        }}
      />
    </>
  );
};

export default AssetsView;
