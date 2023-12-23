"use client"
// Nextjs and React
import Image from "next/image";

//Custom
import styles from "./styles.module.css";
import { Container } from "@mantine/core";

const AppLogo = () => {
  return (
    <Container className={styles.container} p="sm">
      <Image src={"/logo.png"} alt="Arins logo" width={400} height={140} priority={true}  />
    </Container>
  );
};

export default AppLogo;
