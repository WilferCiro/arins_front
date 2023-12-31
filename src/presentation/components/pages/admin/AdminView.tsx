"use client";

import Image from "next/image";

// Nextjs and react

// Mantine
// Custom

const AdminView = () => {
  return (
    <>
      <h1>Bienvenido a Arins</h1>
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

export default AdminView;
