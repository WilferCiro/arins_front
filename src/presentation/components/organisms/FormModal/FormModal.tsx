import { Button, Group, Modal, Space } from "@mantine/core";
import GenericForm from "../GenericForm/GenericForm";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import React, { useEffect, useState } from "react";
import AsyncButton from "../../atoms/AsyncButton/AsyncButton";
import { notifications } from "@mantine/notifications";

interface Props {
  opened: boolean;
  onClose: () => void;
  onAccept: () => Promise<boolean>;
  fields: FormFieldSchema[];
  form: any; // TODO: change type
  title: string;
  aditionalComponentTop?: React.ReactNode;
  aditionalComponentBottom?: React.ReactNode;
}

const FormModal = ({
  aditionalComponentTop,
  aditionalComponentBottom,
  opened,
  onClose,
  fields,
  onAccept,
  form,
  title,
}: Props) => {
  const [canClose, setCanClose] = useState<boolean>(true);

  useEffect(() => {
    if (opened) {
      form.reset();
    }
  }, [opened, form]);

  const acceptAction = async () => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (!valid) {
      return;
    }
    setCanClose(false);
    const value = await onAccept();
    if (value) {
      onClose();
    }
    setCanClose(true);
    return value;
  };

  const showNoClose = () => {
    notifications.show({
      color: "yellow",
      message:
        "No puede cerrar esta ventana hasta que la acción sea completada",
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={canClose ? onClose : showNoClose}
      title={title}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {aditionalComponentTop}
      <GenericForm form={form} fields={fields} />
      <Space h="lg" />
      <Group justify="right" gap="sm">
        <AsyncButton
          disabled={!form.formState.isValid}
          onClick={acceptAction}
          label={"Guardar"}
        />
        <Button
          color={"secondary"}
          variant="outline"
          onClick={canClose ? onClose : showNoClose}
        >
          Cancelar
        </Button>
        {aditionalComponentBottom}
      </Group>
    </Modal>
  );
};

export default FormModal;
