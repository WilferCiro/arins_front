"use client";
import { useAuth } from "@/presentation/context/ContextAuth";
import Image from "next/image";
import FormAddCompany from "@/presentation/components/organisms/FormAddCompany";

const CustomerHomeView = () => {
  const { tokenData } = useAuth();
  return (
    <>
      {!tokenData?.companies || (tokenData?.companies || [])?.length === 0 ? (
        <div>
          <FormAddCompany opened={true} onClose={() => {}} showMessage={true} />
        </div>
      ) : (
        <Image
          src={"/images/explain.svg"}
          alt={"Flujo de arins"}
          width={"921"}
          height={"525"}
          style={{
            display: "block",
            margin: "auto",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
    </>
  );
};

export default CustomerHomeView;
