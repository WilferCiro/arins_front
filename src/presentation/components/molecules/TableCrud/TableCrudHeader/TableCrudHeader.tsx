import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { TableActionsSchema } from "@/domain/schemas/TableActionsSchema";
import { FormType } from "@/domain/types/FormType";
import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import FormModal from "@/presentation/components/organisms/FormModal";
import GenericForm from "@/presentation/components/organisms/GenericForm";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { Button, Flex, Grid, Group, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCirclePlus,
  IconDownload,
  IconFileExport,
  IconSearch,
} from "@tabler/icons-react";
import { ReactElement, useEffect } from "react";

interface Props<T> {
  headerRight?: ReactElement;
  filterAction: () => void;
  formFilter: FormType;
  fieldsFilter: FormFieldSchema[];
  fieldsFormAdd?: FormFieldSchema[];
  actions?: TableActionsSchema<T>;
  refreshTable: () => void;
}

const TableCrudHeader = <T extends object>({
  headerRight,
  filterAction,
  formFilter,
  fieldsFilter,
  fieldsFormAdd,
  actions,
  refreshTable,
}: Props<T>) => {
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  const { form: formAdd } = useCustomForm<T>(fieldsFormAdd || []);

  const openAdd = () => {
    openAddModal();
  };

  const onAdd = async (): Promise<boolean> => {
    if (!actions?.onAdd) {
      return false;
    }
    const valid = await actions.onAdd(formAdd.getValues());
    if (valid) {
      refreshTable();
    }
    return valid;
  };

  const onExport = async (): Promise<boolean> => {
    if (actions?.onExport) {
      await formFilter.trigger();
      const valid = formFilter.formState.isValid;
      if (!valid) {
        return false;
      }
      return await actions.onExport(formFilter.getValues());
    }

    return false;
  };

  useEffect(() => {
    const subscription = formFilter.watch(filterAction);
    return () => subscription.unsubscribe();
  }, [filterAction, formFilter, formFilter.watch]);

  return (
    <>
      <Group justify="space-between" align="center">
        <Group>
          <Flex gap={3}>
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridGap: "7px",
              }}
            >
              <GenericForm form={formFilter} fields={fieldsFilter} />
            </div>
          </Flex>
        </Group>
        <Group>
          {headerRight}

          {actions?.onExport && (
            <AsyncButton
              onClick={onExport}
              leftIcon={<IconDownload size="1.125rem" />}
              label={"Exportar"}
            />
          )}
          {fieldsFormAdd && actions?.onAdd && (
            <>
              <FormModal
                opened={openedAddModal}
                onClose={closeAddModal}
                onAccept={onAdd}
                fields={fieldsFormAdd}
                form={formAdd}
                title={"Crear registro"}
              />
              <Button
                onClick={openAdd}
                variant="light"
                color="blue"
                rightSection={<IconCirclePlus />}
              >
                Agregar
              </Button>
            </>
          )}
        </Group>
      </Group>
    </>
  );
};

export default TableCrudHeader;
