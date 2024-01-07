"use client";
// Nextjs and React
import Image from "next/image";

//Custom
import styles from "./styles.module.css";
import { Container } from "@mantine/core";

const AppLogo = () => {
  return (
    <Container className={styles.container} p="sm">
      <Image
        src={"/images/logos/logo_large.png"}
        alt="Arins logo"
        width={343}
        height={139}
        priority={true}
      />
    </Container>
  );
};

export default AppLogo;
