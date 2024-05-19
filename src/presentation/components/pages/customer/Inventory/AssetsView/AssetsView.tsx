"use client";
import { appConfig } from "@/data/config/app_config";
import {
  getAssetsFormAdd,
  getAssetsFormEdit,
  getAssetsFormFilter,
} from "@/data/forms/assets.form";
import {
  addAssetService,
  deleteAssetService,
  editAssetService,
  exportAssetService,
} from "@/data/services/assets.services";
import { getAssetsTableDefinition } from "@/data/tables/assets.table";
import { AssetSchema } from "@/domain/schemas/AssetSchema";
import PageTitle from "@/presentation/components/molecules/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import ModalMassiveAssets from "@/presentation/components/organisms/ModalMassiveAssets";
import { useAuth } from "@/presentation/context/ContextAuth";
import { Divider } from "@mantine/core";
import { IconAsset } from "@tabler/icons-react";
import { useMemo } from "react";
import { useMutation } from "react-query";

const AssetsView = () => {
  const { currentCompany } = useAuth();
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
  const mutationExport = useMutation({
    mutationFn: exportAssetService,
  });

  const onAdd = async (values: AssetSchema) => {
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (original: AssetSchema, values: AssetSchema) => {
    values._id = original._id;
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };

  const onDelete = async (original: AssetSchema): Promise<boolean> => {
    const res = await mutationDelete.mutateAsync({
      _id: original._id,
    });
    return res !== null;
  };

  const onExport = async (
    filters: Record<string, string> | undefined
  ): Promise<boolean> => {
    const res = await mutationExport.mutateAsync(filters);
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title={"Listado de activos"}
        subtitle={`Administra los activos de ${currentCompany?.name}`}
        icon={<IconAsset />}
      />
      <Divider m="lg" />
      <CrudTable<AssetSchema>
        columns={columns}
        endpoint={"assets"}
        server={appConfig.API_BACKEND_URL}
        filterForm={formFilter}
        headerRight={<ModalMassiveAssets />}
        fieldsForms={{
          add: formAdd,
          edit: formEdit,
        }}
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
          onDelete: onDelete,
          onExport: onExport,
        }}
      />
    </>
  );
};

export default AssetsView;
