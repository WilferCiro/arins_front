import { ActionIcon, Button, Chip, Dialog, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useZxing } from "react-zxing";

interface Props {
  onResult: (barcode: string) => void;
}
const BacodeScanner = ({ onResult }: Props) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { ref } = useZxing({
    paused: !opened,
    onDecodeResult(result) {
      onResult(result.getText());
    },
  });

  const openReader = () => {
    toggle();
  };

  return (
    <>
      <Group>
        <Button onClick={openReader}>Lector de barras con cámara</Button>
      </Group>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
        keepMounted={true}
        withinPortal={false}
      >
        <video
          ref={ref}
          style={{
            width: "100%",
            background: "black",
            height: "150px",
            marginTop: "15px",
            color: "white",
            borderRadius: "10px",
          }}
        />
      </Dialog>
    </>
  );
};

export default BacodeScanner;
