// mantine
import { Alert, Table } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

// Third
import { Column, HeaderGroup, useTable } from "react-table";

// Custom
import styles from "./styles.module.css";

interface Props<T extends object> {
  isLoading?: boolean;
  isError?: boolean;
  showEmpty?: boolean;
  columns: readonly Column<T>[];
  data: T[];
}

const TableComponent = <T extends object>({
  isLoading,
  isError,
  data,
  columns,
  showEmpty,
}: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });

  return (
    <Table
      striped
      highlightOnHover
      {...getTableProps()}
      className={styles.table}
      mb="20"
    >
      <Table.Thead>
        {headerGroups.map((headerGroup: HeaderGroup<T>) => {
          const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
          return (
            <Table.Tr key={key} {...restHeaderProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumnProps } = column.getHeaderProps();
                return (
                  <Table.Th key={key} {...restColumnProps}>
                    {column.render("Header") as React.ReactNode}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          );
        })}
      </Table.Thead>
      <Table.Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <Table.Tr key={key} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <Table.Td key={key} {...restCellProps}>
                    <span className={styles.title_table}>
                      {cell.render("Header") as React.ReactNode}
                    </span>{" "}
                    {cell.render("Cell") as React.ReactNode}
                  </Table.Td>
                );
              })}
            </Table.Tr>
          );
        })}
        {(showEmpty === true || showEmpty === undefined) &&
          rows.length === 0 &&
          !isLoading && (
            <Table.Tr>
              <Table.Td colSpan={columns.length} p="20">
                <Alert
                  icon={<IconAlertCircle size="2rem" />}
                  title="Sin resultados"
                  color="indigo"
                >
                  No hay registros
                </Alert>
              </Table.Td>
            </Table.Tr>
          )}
        {isError && <div>ERROR</div>}
      </Table.Tbody>
    </Table>
  );
};

export default TableComponent;
