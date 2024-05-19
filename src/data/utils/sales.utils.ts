import { SaleSchema } from "@/domain/schemas/SaleSchema";

export const getTotalSales = (sale: SaleSchema) => {
  const prods = sale.sales.flatMap((s) => s.products);
  return prods.reduce((accumulator, dt) => {
    return dt.quantity * dt.price + accumulator;
  }, 0);
};
export const getTotalSalesIva = (sale: SaleSchema) => {
  const prods = sale.sales.flatMap((s) => s.products);
  return prods.reduce((accumulator, dt) => {
    return dt.quantity * dt.price * (dt.iva / 100) + accumulator;
  }, 0);
};
export const getTotalOrders = (sale: SaleSchema) => {
  return sale.orders.reduce((accumulator, dt) => {
    return dt.price + accumulator;
  }, 0);
};

export const getTotalLastSale = (sale: SaleSchema) => {
  let total = 0;
  sale?.sales.at(-1)?.products.forEach((prod) => {
    total += (prod.price * prod.quantity) * (1 - prod.iva / 100);
  })
  return total;
}

export const getTotalSalesFromProducts = (products: SaleSchema["sales"][0]["products"]) => {
  return products.reduce((accumulator, dt) => {
    return dt.quantity * dt.price + accumulator;
  }, 0);
};

export const getTotalSalesIvaFromProducts = (products: SaleSchema["sales"][0]["products"]) => {
  return products.reduce((accumulator, dt) => {
    return dt.quantity * dt.price * (dt.iva / 100) + accumulator;
  }, 0);
};