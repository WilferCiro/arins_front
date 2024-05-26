"use client";
import { appConfig } from "@/data/config/app_config";
import { getEntryUsersFormAdd } from "@/data/forms/entry_users.form";
import { addEntryUserService, editEntryUserService } from "@/data/services/entry_users.services";
import { getEntryUsersTableDefinition } from "@/data/tables/entry_users.table";
import { EntryUserSchema } from "@/domain/schemas/EntryUserSchema";
import PageTitle from "@/presentation/components/molecules/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { useAuth } from "@/presentation/context/ContextAuth";
import { Divider } from "@mantine/core";
import { IconBuildingFortress } from "@tabler/icons-react";
import { useMemo } from "react";

const EntryUsersView = () => {
  const { currentCompany } = useAuth();
  const columns = useMemo(() => getEntryUsersTableDefinition(), []);
  const formAdd = useMemo(() => getEntryUsersFormAdd(), []);
  const formEdit = useMemo(() => getEntryUsersFormAdd(), []);

  const onAdd = async (values: EntryUserSchema) => {
    values.active = true;
    const res = await addEntryUserService(values);
    return res !== null;
  };

  const onEdit = async (
    original: EntryUserSchema,
    values: EntryUserSchema
  ) => {
    values._id = original._id;
    const res = await editEntryUserService(values);
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title={"Listado de usuarios"}
        subtitle={`Administra los usuarios de ${currentCompany?.name}`}
        icon={<IconBuildingFortress />}
      />
      <Divider m="lg" />
      <CrudTable<EntryUserSchema>
        columns={columns}
        endpoint={"UserEntry"}
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

export default EntryUsersView;
