import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import { Button, Group } from "@mantine/core";
import { IconFileExport, IconPlus } from "@tabler/icons-react";

interface Props {
  onExport?: () => Promise<boolean>;
  openAdd?: () => void;
  filterComponent?: React.ReactNode;
}

const CrudHeader = ({ onExport, openAdd, filterComponent }: Props) => {
  return (
    <Group align="right">
      {filterComponent}
      {openAdd && (
        <Button onClick={openAdd} leftSection={<IconPlus size="1.125rem" />}>
          Nuevo
        </Button>
      )}
    </Group>
  );
};

export default CrudHeader;
