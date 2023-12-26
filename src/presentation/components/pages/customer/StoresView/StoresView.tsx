"use client";
import { appConfig } from "@/data/config/app_config";
import { getStoresFormAdd, getStoresFormEdit } from "@/data/forms/stores.form";
import {
  addStoreService,
  editStoreService,
} from "@/data/services/stores.services";
import { getStoresTableDefinition } from "@/data/tables/stores.table";
import { StoreSchema } from "@/domain/schemas/StoreSchema";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { Divider } from "@mantine/core";
import { IconBuildingStore } from "@tabler/icons-react";
import { useMemo } from "react";
import { useMutation } from "react-query";

const StoresView = () => {
  const columns = useMemo(() => getStoresTableDefinition(), []);
  const formAdd = useMemo(() => getStoresFormAdd(), []);
  const formEdit = useMemo(() => getStoresFormEdit(), []);

  const mutationAdd = useMutation({
    mutationFn: addStoreService,
  });
  const mutationEdit = useMutation({
    mutationFn: editStoreService,
  });

  const onAdd = async (values: StoreSchema) => {
    values.active = true;
    values.company_id = "658738b4755b1badd755aaa9";
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (original: StoreSchema, values: StoreSchema) => {
    values._id = original._id;
    console.log(values);
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title={"Listado de bodegas"}
        subtitle="Administra las bodegas de {empresa}"
        icon={<IconBuildingStore />}
      />
      <Divider m="lg" />
      <CrudTable<StoreSchema>
        columns={columns}
        endpoint={"stores"}
        server={appConfig.API_BACKEND_URL}
        fieldsForms={{
          add: formAdd,
          edit: formEdit,
        }}
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
        }}
      />
    </>
  );
};

export default StoresView;
