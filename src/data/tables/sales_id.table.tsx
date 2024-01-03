import { Column } from "react-table";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { SaleTableSchema } from "@/domain/schemas/SaleIdSchema";
import {
  ActionIcon,
  Button,
  Divider,
  FocusTrap,
  HoverCard,
  NumberInput,
  Popover,
  Text,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface Props {
  onDeleteProduct: (_id: string) => void;
}

export const getSaleTableDefinition = ({
  onDeleteProduct,
}: Props): Column<SaleTableSchema>[] => {
  return [
    {
      Header: "Producto",
      accessor: "product",
      Cell: ({ cell }) => {
        const active = cell.row.original.active;
        const value = cell.value;
        return <div className={active ? "row-active" : ""}>{value}</div>;
      },
    },
    {
      Header: "Precio",
      accessor: "price",
      Cell: ({ cell }) => {
        const active = cell.row.original.active;
        const value = cell.value;
        return (
          <div className={active ? "row-active" : ""}>
            {getPriceFormat(value)}
          </div>
        );
      },
    },
    {
      Header: "Cantidad",
      accessor: "quantity",
      Cell: ({ cell }) => {
        const active = cell.row.original.active;
        const value = cell.value;
        return (
          <>
            {active ? (
              <FocusTrap active={true}>
                <NumberInput
                  value={value}
                  w="100px"
                  onFocus={(e) => e.target.select()}
                />
              </FocusTrap>
            ) : (
              <NumberInput value={value} w="100px" />
            )}
          </>
        );
      },
    },
    {
      Header: "Iva",
      Cell: ({ cell }) => {
        const active = cell.row.original.active;
        const original = cell.row.original;
        return (
          <div className={active ? "row-active" : ""}>
            {getPriceFormat(
              original.quantity * original.price * (original.iva / 100)
            )} ({original.iva} %)
          </div>
        );
      },
    },
    {
      Header: "Total",
      Cell: ({ cell }) => {
        const active = cell.row.original.active;
        return (
          <div className={active ? "row-active" : ""}>
            {getPriceFormat(
              cell.row.original.quantity * cell.row.original.price
            )}
          </div>
        );
      },
    },
    {
      Header: "Acciones",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return (
          <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon variant="filled" aria-label="Settings" color="red">
                <IconTrash
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm">
                ¿Estás seguro de remover este producto de este pedido?
              </Text>
              <Divider mt="md" mb="md" />
              <Button
                variant="outline"
                size="compact-sm"
                onClick={() => onDeleteProduct(original.product_id)}
              >
                Si, remover
              </Button>
            </Popover.Dropdown>
          </Popover>
        );
      },
    },
  ];
};
