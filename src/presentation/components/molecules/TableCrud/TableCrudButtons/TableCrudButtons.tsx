import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { TableActionsSchema } from "@/domain/schemas/TableActionsSchema";
import FormModal from "@/presentation/components/organisms/FormModal";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { ActionIcon, Group, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconToggleLeft, IconTrash } from "@tabler/icons-react";
import { useCallback, useRef } from "react";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";

interface Props<T> {
  actions?: TableActionsSchema<T>;
  original: T;
  fieldsForms?: {
    edit?: FormFieldSchema[];
  };
  refreshTable: () => void;
}

const TableCrudButtons = <T extends object>({
  actions,
  original,
  fieldsForms,
  refreshTable,
}: Props<T>) => {
  const focusRegister = useRef<T | null>(null);
  const setFocusRegister = useCallback((value: T | null) => {
    focusRegister.current = value;
  }, []);

  const { form: formEdit } = useCustomForm<T>(fieldsForms?.edit || []);

  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    openedDeleteModal,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [
    openedDisableModal,
    { open: openDisableModal, close: closeDisableModal },
  ] = useDisclosure(false);

  const openEdit = useCallback(
    (data: T) => {
      setFocusRegister(data);
      const newData = { ...data };
      Object.keys(data).map((key) => {
        if (data[key as keyof T] && (data[key as keyof T] as any)?.id) {
          newData[key as keyof T] = (data[key as keyof T] as any).id;
        } else {
          newData[key as keyof T] = data[key as keyof T];
        }
      });
      formEdit.reset(newData);
      openEditModal();
    },
    [formEdit, openEditModal, setFocusRegister]
  );

  const openDelete = useCallback(
    (data: T) => {
      setFocusRegister(data);
      openDeleteModal();
    },
    [openDeleteModal, setFocusRegister]
  );
  const openDisable = useCallback(
    (data: T) => {
      setFocusRegister(data);
      openDisableModal();
    },
    [openDisableModal, setFocusRegister]
  );

  const onDisable = async (): Promise<boolean> => {
    if (!focusRegister.current || !actions?.onDisable) {
      return false;
    }
    const valid = await actions.onDisable(focusRegister.current);
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const onEdit = async (): Promise<boolean> => {
    if (!focusRegister.current || !actions?.onEdit) {
      return false;
    }
    const valid = await actions.onEdit(
      focusRegister.current,
      formEdit.getValues()
    );
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const onDelete = async () => {
    if (!focusRegister.current || !actions?.onDelete) {
      return false;
    }
    const valid = await actions.onDelete(focusRegister.current);
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  return (
    <>
      <FormModal
        opened={openedEditModal}
        onClose={closeEditModal}
        onAccept={onEdit}
        fields={fieldsForms?.edit || []}
        form={formEdit}
        title={"Crear registro"}
      />
      <ModalConfirm
        opened={openedDisableModal}
        onClose={closeDisableModal}
        onAccept={onDisable}
        title="Modificar registro"
        text={`¿Desea ${
          (focusRegister?.current as any)?.active === undefined
            ? "activar/desactivar"
            : (focusRegister?.current as any)?.active
            ? "desactivas"
            : "activar"
        } este registro?`}
      />
      <ModalConfirm
        opened={openedDeleteModal}
        onClose={closeDeleteModal}
        onAccept={onDelete}
        title="¿Eliminar?"
        text="¿Desea eliminar este registro?"
      />
      <Group gap="xs">
        {actions?.onEdit && (
          <Tooltip label="Editar registro">
            <ActionIcon
              onClick={() => openEdit(original)}
              color="yellow"
              variant="filled"
            >
              <IconEdit size="1.125rem" />
            </ActionIcon>
          </Tooltip>
        )}
        {actions?.onDelete && (
          <Tooltip label="Eliminar registro">
            <ActionIcon
              color="red"
              variant="filled"
              onClick={() => openDelete(original)}
            >
              <IconTrash size="1.125rem" />
            </ActionIcon>
          </Tooltip>
        )}
        {actions?.onDisable && (
          <Tooltip label="Activar/Desactivar registro">
            <ActionIcon
              color="blue"
              variant="filled"
              onClick={() => openDisable(original)}
            >
              <IconToggleLeft size="1.125rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </>
  );
};

export default TableCrudButtons;
