"use client";
import { Button } from "@mantine/core";
import Link from "next/link";

const MainView = () => {
  return (
    <>
      <h1>Bienvenido</h1>
      <Link href="/login">
        <Button>Iniciar sesión</Button>
      </Link>
    </>
  );
};

export default MainView;
