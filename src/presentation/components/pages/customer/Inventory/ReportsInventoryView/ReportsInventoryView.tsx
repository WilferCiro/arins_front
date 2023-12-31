"use client";
import { getReportsInventoryForm } from "@/data/forms/inventory_reports.form";
import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import GenericForm from "@/presentation/components/organisms/GenericForm";
import { useAuth } from "@/presentation/context/ContextAuth";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { Card, Divider, Space } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { useMemo } from "react";

const ReportsInventoryView = () => {
  const { currentCompany } = useAuth();
  const fieldsForm = useMemo(() => getReportsInventoryForm(), []);
  const { form } = useCustomForm(fieldsForm);
  return (
    <>
      <PageTitle
        title={"Reportes de inventarios"}
        subtitle={`Genera informes de ${currentCompany?.name}`}
        icon={<IconFile />}
      />
      <Divider m="lg" />
      <Card shadow="sm" padding="lg" radius="md" withBorder w={"50%"} m="auto">
        <GenericForm form={form} fields={fieldsForm} />
        <Space h={"md"} />
        <AsyncButton
          fullWidth={true}
          label={"Generar informe"}
          onClick={function (): Promise<boolean | void> {
            throw new Error("Function not implemented.");
          }}
        />
      </Card>
    </>
  );
};

export default ReportsInventoryView;
