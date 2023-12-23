"use client";

// Nextjs and react

// Mantine
import {
  AppShell,
  Burger,
  Card,
  Group,
  NavLink,
  Skeleton,
} from "@mantine/core";

// Custom
import CustomHeader from "../../molecules/CustomHeader/CustomHeader";
import CustomFooter from "../../molecules/CustomFooter/CustomFooter";
import { useDisclosure } from "@mantine/hooks";
import { IconHome2 } from "@tabler/icons-react";
import CustomNavbar from "../../molecules/CustomNavbar";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <CustomHeader
          toggleDesktop={toggleDesktop}
          desktopOpened={desktopOpened}
          toggleMobile={toggleMobile}
          mobileOpened={mobileOpened}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <CustomNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <main>{children}</main>
      </AppShell.Main>
      <AppShell.Footer>
        <CustomFooter />
      </AppShell.Footer>
    </AppShell>
  );
}
