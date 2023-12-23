import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconTransfer } from "@tabler/icons-react";

interface Props<T> {
  openEdit?: (data: T) => void;
  original: T;
}

const CrudRowButtons = <T extends object>({ openEdit, original }: Props<T>) => {
  return (
    <Group gap={5}>
      {openEdit && (
        <Tooltip label="Transferir token">
          <ActionIcon
            onClick={() => openEdit(original)}
            color="yellow"
            variant="filled"
          >
            <IconTransfer size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
};

export default CrudRowButtons;
