"use client";
import { getReportsInventoryForm } from "@/data/forms/inventory_reports.form";
import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import PageTitle from "@/presentation/components/molecules/PageTitle";
import GenericForm from "@/presentation/components/organisms/GenericForm";
import { useAuth } from "@/presentation/context/ContextAuth";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { Card, Divider, Space } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { useMemo } from "react";

import styles from "./styles.module.css";
import { useMutation } from "react-query";
import { generateReportInventory } from "@/data/services/inventoryReports.services";

const ReportsInventoryView = () => {
  const { currentCompany } = useAuth();
  const fieldsForm = useMemo(() => getReportsInventoryForm(), []);
  const { form } = useCustomForm(fieldsForm);

  const mutation = useMutation({
    mutationFn: generateReportInventory,
  });

  const generate = async (): Promise<boolean> => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (!valid) {
      return false;
    }
    const data = await mutation.mutateAsync(form.getValues());
    return !!data;
  };

  return (
    <>
      <PageTitle
        title={"Reportes de inventarios"}
        subtitle={`Genera informes de ${currentCompany?.name}`}
        icon={<IconFile />}
      />
      <Divider m="lg" />
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        m="auto"
        className={styles.card}
      >
        <GenericForm form={form} fields={fieldsForm} />
        <Space h={"md"} />
        <AsyncButton
          fullWidth={true}
          label={"Generar informe"}
          onClick={generate}
        />
      </Card>
    </>
  );
};

export default ReportsInventoryView;
