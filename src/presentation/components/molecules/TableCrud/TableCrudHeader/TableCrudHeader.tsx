import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { TableActionsSchema } from "@/domain/schemas/TableActionsSchema";
import { FormType } from "@/domain/types/FormType";
import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import FormModal from "@/presentation/components/organisms/FormModal";
import GenericForm from "@/presentation/components/organisms/GenericForm";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { Button, Flex, Grid, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCirclePlus, IconDownload } from "@tabler/icons-react";
import { ReactElement, useEffect } from "react";
import styles from "./styles.module.css";
interface Props<T> {
  headerRight?: ReactElement;
  filterAction: () => void;
  formFilter: FormType;
  fieldsFilter: FormFieldSchema[];
  fieldsFormAdd?: FormFieldSchema[];
  actions?: TableActionsSchema<T>;
  refreshTable: () => void;
  disabledAdd?: boolean;
}

const TableCrudHeader = <T extends object>({
  headerRight,
  filterAction,
  formFilter,
  fieldsFilter,
  fieldsFormAdd,
  actions,
  refreshTable,
  disabledAdd,
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
      <Grid justify="space-between" align="center">
        <Grid.Col span={{ base: 12, md: 7, lg: 7 }}>
          <div className={styles.header_filters}>
            <GenericForm form={formFilter} fields={fieldsFilter} />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Group justify="flex-end">
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
                  disabled={disabledAdd ?? false}
                  title={
                    disabledAdd
                      ? "No puedes crear más registros"
                      : "Click para crear un nuevo registro"
                  }
                >
                  Agregar
                </Button>
              </>
            )}
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default TableCrudHeader;
