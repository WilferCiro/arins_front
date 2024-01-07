import SalesIdView from "@/presentation/components/pages/customer/Sales/SalesIdView";

export const metadata = {
  title: "Arins :: Venta del día",
};

const SalesIdPage = ({ params }: { params: { _id: string } }) => {
  return (
    <>
      <SalesIdView sale_id={params._id} />
    </>
  );
};

export default SalesIdPage;
