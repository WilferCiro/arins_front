"use client";

// Nextjs and react

// Mantine
import { AppShell, ScrollArea } from "@mantine/core";

// Custom
import CustomHeader from "../../organisms/CustomHeader/CustomHeader";
import CustomFooter from "../../organisms/CustomFooter/CustomFooter";
import { useDisclosure } from "@mantine/hooks";
import CustomNavbar from "../../organisms/CustomNavbar";
import { ContextProviderAccess } from "@/presentation/context/ContextAccess";
import { CompanyAccessSchema } from "@/domain/schemas/CompanySchema";

export default function AdminAuthLayout({
  children,
  access,
}: {
  children: React.ReactNode;
  access?: CompanyAccessSchema | null;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <ContextProviderAccess pAccess={access}>
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
          <AppShell.Section grow my="md" component={ScrollArea}>
            <CustomNavbar
              toggleDesktop={toggleDesktop}
              desktopOpened={desktopOpened}
            />
          </AppShell.Section>
          <AppShell.Section>
            <CustomFooter />
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>
          <main>{children}</main>
        </AppShell.Main>
      </AppShell>
    </ContextProviderAccess>
  );
}
