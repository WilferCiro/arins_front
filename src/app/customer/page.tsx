import Image from "next/image";

const CustomerHomePage = () => {
  return (
    <>
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
    </>
  );
};

export default CustomerHomePage;
