import { getTableNftDefinition } from "@/data/tables/nfts.table";
import CrudTable from "../CrudTable";
import CrudHeader from "../../molecules/CrudTable/CrudHeader";
import { useCallback, useMemo, useRef, useState } from "react";
import FormModal from "../FormModal";
import {
  getCertCreationFormDefinition,
  getCertUpdateFormDefinition,
} from "@/data/forms/certifications.form";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import CertSchema from "@/domain/schemas/CertSchema";
import { useQueryClient } from "react-query";
import CrudRowButtons from "../../molecules/CrudTable/CrudRowButtons";
import { Input } from "@mantine/core";

interface Props {
  onAdd: (data: CertSchema) => Promise<boolean>;
  onEdit: (data: CertSchema, original: CertSchema) => Promise<boolean>;
}

const TableCertificates = ({ onAdd, onEdit }: Props) => {
  const queryClient = useQueryClient();
  const fieldsCreateForm = useMemo(() => getCertCreationFormDefinition(), []);
  const fieldsUpdateForm = useMemo(() => getCertUpdateFormDefinition(), []);
  const { form: formAdd } = useCustomForm<CertSchema>(fieldsCreateForm);
  const { form: formEdit } = useCustomForm<CertSchema>(fieldsUpdateForm);

  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);

  const focusRegister = useRef<CertSchema | null>(null);
  const setFocusRegister = useCallback((value: CertSchema | null) => {
    focusRegister.current = value;
  }, []);

  // TABLE
  const refreshTable = async () => {
    await queryClient.refetchQueries([`nfts_paginated`], {
      active: true,
    });
  };

  // ADD
  const closeAdd = () => {
    setVisibleAdd(false);
  };
  const openAdd = () => {
    setVisibleAdd(true);
  };

  // EDIT
  const closeEdit = () => {
    setVisibleEdit(false);
  };

  const openEdit = useCallback(
    (data: CertSchema) => {
      setFocusRegister(data);
      const newData = { ...data };
      formEdit.reset(newData);
      setVisibleEdit(true);
    },
    [formEdit, setFocusRegister]
  );

  const onAddClick = async (): Promise<boolean> => {
    if (!onAdd) {
      return false;
    }
    const valid = await onAdd(formAdd.getValues());
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const onEditClick = async (): Promise<boolean> => {
    if (!focusRegister.current || !onEdit) {
      return false;
    }
    const valid = await onEdit(formEdit.getValues(), focusRegister.current);
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const crudColumns = useMemo(() => {
    const newCols = [...getTableNftDefinition()];
    newCols.push({
      Header: "Acciones",
      Cell: ({ row: { original } }) => {
        return (
          <CrudRowButtons<CertSchema>
            original={original as CertSchema}
            openEdit={openEdit}
          />
        );
      },
    });
    return newCols;
  }, [openEdit]);

  return (
    <>
      <FormModal
        title="Agregar registro"
        opened={visibleAdd}
        onClose={closeAdd}
        fields={getCertCreationFormDefinition()}
        onAccept={onAddClick}
        form={formAdd}
      />
      <FormModal
        title="Modificar registro"
        opened={visibleEdit}
        onClose={closeEdit}
        fields={getCertUpdateFormDefinition()}
        onAccept={onEditClick}
        form={formEdit}
      />
      <CrudTable
        columns={crudColumns}
        endpoint={`nfts`}
        headerRight={<CrudHeader openAdd={openAdd} />}
      />
    </>
  );
};

export default TableCertificates;
