"use client";
import { appConfig } from "@/data/config/app_config";
import {
  getDependenciesFormAdd,
  getDependenciesFormEdit,
} from "@/data/forms/dependencies.form";
import {
  addDependencyService,
  editDependencyService,
} from "@/data/services/dependencies.services";
import { getDependenciesTableDefinition } from "@/data/tables/dependencies.table";
import { DependencySchema } from "@/domain/schemas/DependencySchema";
import PageTitle from "@/presentation/components/molecules/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { ContextAuth, useAuth } from "@/presentation/context/ContextAuth";
import { Divider } from "@mantine/core";
import { IconBuildingFortress } from "@tabler/icons-react";
import { useContext, useMemo } from "react";
import { useMutation } from "react-query";

const DependenciesView = () => {
  const { currentCompany } = useAuth();
  const columns = useMemo(() => getDependenciesTableDefinition(), []);
  const formAdd = useMemo(() => getDependenciesFormAdd(), []);
  const formEdit = useMemo(() => getDependenciesFormEdit(), []);

  const mutationAdd = useMutation({
    mutationFn: addDependencyService,
  });
  const mutationEdit = useMutation({
    mutationFn: editDependencyService,
  });

  const onAdd = async (values: DependencySchema) => {
    values.active = true;
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (
    original: DependencySchema,
    values: DependencySchema
  ) => {
    values._id = original._id;
    console.log(values);
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title={"Listado de dependencias"}
        subtitle={`Administra las dependencias de ${currentCompany?.name}`}
        icon={<IconBuildingFortress />}
      />
      <Divider m="lg" />
      <CrudTable<DependencySchema>
        columns={columns}
        endpoint={"dependencies"}
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

export default DependenciesView;
