"use client";

// Nextjs and react

// Mantine
import { AppShell } from "@mantine/core";

// Custom
import CustomHeader from "../../molecules/CustomHeader/CustomHeader";
import CustomFooter from "../../molecules/CustomFooter/CustomFooter";

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      header={{ height: 80 }}
      padding="md"
    >
      <AppShell.Header>
        <CustomHeader />
      </AppShell.Header>
      <AppShell.Main>
        <main style={{ minHeight: "83vh" }}>{children}</main>
      </AppShell.Main>
      <AppShell.Footer>
        <CustomFooter />
      </AppShell.Footer>
    </AppShell>
  );
}
