"use client";

import { Box, LoadingOverlay } from "@mantine/core";
import { Column } from "react-table";
import { ReactElement, startTransition, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import styles from "./styles.module.css";
import TableComponent from "../../molecules/TableComponent/TableComponent";
import { getPaginatedData } from "@/data/services/table.services";
import { getTableSearchFormDefinition } from "@/data/forms/table_crud.form";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import CustomTableFooter from "../../molecules/CustomTableFooter";
import TableCrudHeader from "../../molecules/TableCrud/TableCrudHeader";
import TableCrudButtons from "../../molecules/TableCrud/TableCrudButtons/TableCrudButtons";
import { TableActionsSchema } from "@/domain/schemas/TableActionsSchema";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

interface Props<T extends object> {
  columns: readonly Column<T>[];
  endpoint: string;
  server: string;

  filterForm?: FormFieldSchema[] | undefined;

  headerRight?: ReactElement;

  actions?: TableActionsSchema<T>;

  fieldsForms?: {
    edit?: FormFieldSchema[];
    add?: FormFieldSchema[];
  };
}

const CrudTable = <T extends object>({
  columns,
  endpoint,
  server,

  filterForm,

  headerRight,
  actions,
  fieldsForms,
}: Props<T>) => {
  const queryClient = useQueryClient();

  const fieldsFilter = useMemo(
    () => filterForm || getTableSearchFormDefinition(),
    [filterForm]
  );
  const { form, initialValues } = useCustomForm(fieldsFilter);
  const [filters, setFilters] = useState<Record<string, string> | undefined>(
    initialValues || undefined
  );

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);

  const { isError, data, isFetching } = useQuery(
    [`${endpoint}_paginated`, { server, endpoint, page, count, filters }],
    () => getPaginatedData<T>({ server, endpoint, page, count, filters }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const changePage = (pPage: number) => {
    setPage(pPage);
  };

  const changeCount = (pCount: number) => {
    setCount(pCount || 10);
  };

  const filterAction = async () => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (!valid) {
      return;
    }
    startTransition(() => {
      setFilters(form.getValues());
    });
  };

  const crudColumns = () => {
    const newCols = [...columns];
    if (actions?.onDelete || actions?.onDisable || actions?.onEdit) {
      newCols.push({
        Header: "Acciones",
        Cell: ({ row: { original } }: { row: { original: T } }) => {
          return (
            <TableCrudButtons<T>
              original={original}
              actions={actions}
              refreshTable={refreshTable}
              fieldsForms={{
                edit: fieldsForms?.edit,
              }}
            />
          );
        },
      });
    }
    return newCols;
  };

  const refreshTable = async () => {
    await queryClient.refetchQueries([`${endpoint}_paginated`], {
      active: true,
    });
  };

  return (
    <div className={styles.table_container}>
      <header className={styles.header}>
        <TableCrudHeader<T>
          headerRight={headerRight}
          filterAction={filterAction}
          formFilter={form}
          fieldsFilter={fieldsFilter}
          fieldsFormAdd={fieldsForms?.add}
          actions={actions}
          refreshTable={refreshTable}
        />
      </header>
      <Box pos="relative">
        <LoadingOverlay visible={isFetching} />
        <div className={styles.table_responsive}>
          <TableComponent
            isLoading={isFetching}
            isError={isError}
            columns={crudColumns()}
            data={data?.data || []}
          />
        </div>
        <CustomTableFooter
          page={page}
          count={count}
          total={data?.total || 0}
          changePage={changePage}
          changeCount={changeCount}
        />
      </Box>
    </div>
  );
};

export default CrudTable;
