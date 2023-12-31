"use client";
import { appConfig } from "@/data/config/app_config";
import {
  getProductsFormAdd,
  getProductsFormEdit,
  getProductsFormFilter,
} from "@/data/forms/products.form";
import {
  addProductService,
  deleteProductService,
  editProductService,
} from "@/data/services/products.services";
import { getProductsTableDefinition } from "@/data/tables/products.table";
import { AssetSchema } from "@/domain/schemas/AssetSchema";
import { ProductSchema } from "@/domain/schemas/ProductSchema";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { ContextAuth } from "@/presentation/context/ContextAuth";
import { Divider } from "@mantine/core";
import { IconBox } from "@tabler/icons-react";
import { useContext, useMemo } from "react";
import { useMutation } from "react-query";

const ProductsView = () => {
  const { currentCompany } = useContext(ContextAuth);

  const columns = useMemo(() => getProductsTableDefinition(), []);
  const formAdd = useMemo(() => getProductsFormAdd(), []);
  const formEdit = useMemo(() => getProductsFormEdit(), []);
  const formFilter = useMemo(() => getProductsFormFilter(), []);

  const mutationAdd = useMutation({
    mutationFn: addProductService,
  });
  const mutationEdit = useMutation({
    mutationFn: editProductService,
  });
  const mutationDelete = useMutation({
    mutationFn: deleteProductService,
  });

  const onAdd = async (values: ProductSchema) => {
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (original: ProductSchema, values: ProductSchema) => {
    values._id = original._id;
    console.log(values);
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };

  const onDelete = async (original: ProductSchema): Promise<boolean> => {
    const res = await mutationDelete.mutateAsync({
      _id: original._id,
    });
    return res !== null;
  };

  return (
    <>
      <PageTitle
        title={"Listado de productos"}
        subtitle={`Administra los productos de ${currentCompany?.name}`}
        icon={<IconBox />}
      />
      <Divider m="lg" />
      <CrudTable<ProductSchema>
        columns={columns}
        endpoint={"products"}
        server={appConfig.API_BACKEND_URL}
        filterForm={formFilter}
        fieldsForms={{
          add: formAdd,
          edit: formEdit,
        }}
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
          onDelete: onDelete,
        }}
      />
    </>
  );
};

export default ProductsView;
