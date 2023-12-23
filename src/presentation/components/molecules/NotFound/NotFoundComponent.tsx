"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { Title, Text, Button, Container, Group } from "@mantine/core";

export default function NotFoundComponent() {
  return (
    <Container className={styles.root}>
      <div className={styles.label}>404</div>
      <Title className={styles.title}>Te has extraviado.</Title>
      <Text c="dimmed" size="lg" ta="center" className={styles.description}>
        Desafortunadamente esta página no existe, por favor vuelve al inicio
      </Text>
      <Group justify="center" mt={"xl"}>
        <Link href={"/login"}>
          <Button variant="subtle" size="md">
            Volver al inicio
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
