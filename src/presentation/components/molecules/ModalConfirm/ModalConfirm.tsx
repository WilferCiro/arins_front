import { Button, Group, Modal, Space, Text } from "@mantine/core";
import AsyncButton from "../../atoms/AsyncButton/AsyncButton";

interface Props {
  opened: boolean;
  onClose: () => void;
  onAccept: () => Promise<boolean>;
  text: string;
  title: string;
}

const ModalConfirm = ({ opened, onClose, onAccept, text, title }: Props) => {
  const acceptAction = async () => {
    const value = await onAccept();
    if (value) {
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <Text>{text}</Text>

      <Space h="lg" />
      <Group justify="flex-end" gap="sm">
        <AsyncButton label="Aceptar" color={"red"} onClick={acceptAction} />
        <Button onClick={onClose}>Cancelar</Button>
      </Group>
    </Modal>
  );
};

export default ModalConfirm;
