"use client";
import { appConfig } from "@/data/config/app_config";
import {
  getCompaniesFormAdd,
  getCompaniesFormEdit,
} from "@/data/forms/companies.form";
import { getUsersFormAdd, getUsersFormEdit } from "@/data/forms/users.form";
import {
  addCompanyService,
  deleteCompanyService,
  editCompanyService,
} from "@/data/services/companies.services";
import {
  addUserService,
  deleteUserService,
  editUserService,
} from "@/data/services/users.services";
import { getUsersTableDefinition } from "@/data/tables/users.table";
import { CompanySchema } from "@/domain/schemas/CompanySchema";
import { UserSchema } from "@/domain/schemas/UserSchema";
import PageTitle from "@/presentation/components/molecules/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { Divider } from "@mantine/core";
import { IconBuilding, IconUser, IconUsers } from "@tabler/icons-react";
import { useMemo } from "react";
import { useMutation } from "react-query";

const UsersView = () => {
  const columns = useMemo(() => getUsersTableDefinition(), []);
  const formAdd = useMemo(() => getUsersFormAdd(), []);
  const formEdit = useMemo(() => getUsersFormEdit(), []);

  const mutationAdd = useMutation({
    mutationFn: addUserService,
  });
  const mutationEdit = useMutation({
    mutationFn: editUserService,
  });
  const mutationDelete = useMutation({
    mutationFn: deleteUserService,
  });

  const onDisable = async (original: UserSchema): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({
      _id: original._id,
      active: !original.active,
    });
    return res !== null;
  };

  const onDelete = async (original: UserSchema): Promise<boolean> => {
    const res = await mutationDelete.mutateAsync({
      _id: original._id,
    });
    return res !== null;
  };

  const onAdd = async (values: UserSchema) => {
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (original: UserSchema, values: UserSchema) => {
    values._id = original._id;
    console.log(values);
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title={"Listado de usuarios"}
        subtitle="Administra los usuarios de arins"
        icon={<IconUsers />}
      />
      <Divider m="lg" />
      <CrudTable<UserSchema>
        columns={columns}
        endpoint={"users"}
        server={appConfig.API_BACKEND_URL}
        filterForm={undefined}
        fieldsForms={{
          add: formAdd,
          edit: formEdit,
        }}
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
          onDisable: onDisable,
          onDelete: onDelete,
        }}
      />
    </>
  );
};

export default UsersView;
