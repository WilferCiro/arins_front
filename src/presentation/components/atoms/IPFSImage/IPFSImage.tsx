import {
  Avatar,
  Button,
  Card,
  Flex,
  Spoiler,
  Title,
  Tooltip,
  Modal,
} from "@mantine/core";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import style from "./styles.module.css";

interface Props {
  url?: string;
  tokenId: string | number;
  size?: string;
}

const IPFSImage = ({ url, tokenId, size }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  if (!url) {
    return (
      <Avatar radius="sm" size={"xl"} color="primary" onClick={open}>
        #{tokenId}
      </Avatar>
    );
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Imagen del certificado"
        size="xl"
      >
        <div className={style.image}>
          <Image
            src={`https://ipfs.moralis.io:2053/ipfs/${url?.replace("ipfs://", "")}`}
            alt="Certificado de estudiante"
            width="500"
            height="400"
          />
        </div>
      </Modal>
      <Tooltip label="Click para ver grande">
        <Avatar radius="sm" size={"xl"} onClick={open} className={style.cursor_pointer}>
          <Image
            src={`https://ipfs.moralis.io:2053/ipfs/${url?.replace("ipfs://", "")}`}
            alt="Certificado del estudiante"
            width="100"
            height="60"
          />
        </Avatar>
      </Tooltip>
    </>
  );
};

export default IPFSImage;
