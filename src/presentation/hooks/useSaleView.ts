import { ProductSchema } from "@/domain/schemas/ProductSchema";
import { SaleTableSchema } from "@/domain/schemas/SaleIdSchema";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const useSaleView = () => {
  const [dataTable, setDataTable] = useState<SaleTableSchema[]>([]);

  const deleteDataTableRow = (_id: string) => {
    const existsProduct = dataTable?.findIndex(
      (data) => data.product_id === _id
    );
    if (existsProduct === -1) {
      notifications.show({
        title: "Error",
        message: "Este código de barras no existe",
      });
      return;
    }
    let newData = [...dataTable];
    newData.splice(existsProduct, 1);
    setDataTable(newData);
  };

  const addProduct = (existsProduct: ProductSchema) => {
    if (!existsProduct) return;

    let newData = [
      ...dataTable.map((data) => ({
        ...data,
        active: false,
      })),
    ];
    const exists = newData.findIndex((item) => item.product_id === existsProduct._id);
    if (exists !== -1) {
      newData[exists].quantity = newData[exists].quantity + 1;
      newData[exists].active = true;
    } else {
      newData = [
        ...dataTable,
        {
          product_id: existsProduct._id || "",
          product: existsProduct.name + " - " + existsProduct.barcode,
          price: existsProduct.price,
          quantity: 1,
          iva: existsProduct.iva,
          active: true,
        },
      ];
    }
    setDataTable(newData);
  };

  const emptyDataTable = () => {    
    setDataTable([]);
  }

  return {
    dataTable,
    deleteDataTableRow,
    addProduct,
    emptyDataTable
  };
};

export default useSaleView;
