"use client";
import PageTitle from "@/presentation/components/molecules/PageTitle";
import { useAuth } from "@/presentation/context/ContextAuth";
import { Divider, Tabs } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";

const HelpView = () => {
  const { currentCompany } = useAuth();

  return (
    <>
      <PageTitle
        title={"Ayuda"}
        subtitle={`Recursos de ayuda de arins`}
        icon={<IconHelp />}
      />
      <Divider m="lg" />
      <Tabs color="teal" defaultValue="inventory">
        <Tabs.List>
          <Tabs.Tab value="inventory" color="green">
            Gestión de inventarios
          </Tabs.Tab>
          <Tabs.Tab value="sales" color="blue">
            Gestión de ventas
          </Tabs.Tab>
          <Tabs.Tab value="entry" color="yellow">
            Gestión de ingresos
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="inventory" pt="xs">
          <Tabs defaultValue="QR" orientation="vertical">
            <Tabs.List>
              <Tabs.Tab value="QR">QR</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="QR">---</Tabs.Panel>
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="sales" pt="xs">
          <Tabs defaultValue="barcode" orientation="vertical">
            <Tabs.List>
              <Tabs.Tab value="barcode">Código de barras</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="barcode">---</Tabs.Panel>
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="entry" pt="xs">
          ---
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default HelpView;
