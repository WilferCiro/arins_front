"use client";
import { appConfig } from "@/data/config/app_config";
import {
  getCompaniesFormAdd,
  getCompaniesFormEdit,
} from "@/data/forms/companies.form";
import {
  addCompanyService,
  deleteCompanyService,
  editCompanyService,
} from "@/data/services/companies.services";
import { getCompaniesTableDefinition } from "@/data/tables/companies.table";
import { CompanySchema } from "@/domain/schemas/CompanySchema";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { useMemo } from "react";
import { useMutation } from "react-query";

const CompaniesView = () => {
  const columns = useMemo(() => getCompaniesTableDefinition(), []);
  const formAdd = useMemo(() => getCompaniesFormAdd(), []);
  const formEdit = useMemo(() => getCompaniesFormEdit(), []);

  const mutationAdd = useMutation({
    mutationFn: addCompanyService,
  });
  const mutationEdit = useMutation({
    mutationFn: editCompanyService,
  });
  const mutationDelete = useMutation({
    mutationFn: deleteCompanyService,
  });

  const onDisable = async (original: CompanySchema): Promise<boolean> => {
    const res = await mutationEdit.mutateAsync({
      _id: original._id,
      active: !original.active,
    });
    return res !== null;
  };

  const onDelete = async (original: CompanySchema): Promise<boolean> => {
    const res = await mutationDelete.mutateAsync({
      _id: original._id,
    });
    return res !== null;
  };

  const onAdd = async (values: CompanySchema) => {
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (original: CompanySchema, values: CompanySchema) => {
    values._id = original._id;
    console.log(values);
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };

  return (
    <>
      <CrudTable<CompanySchema>
        columns={columns}
        endpoint={"companies"}
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

export default CompaniesView;
