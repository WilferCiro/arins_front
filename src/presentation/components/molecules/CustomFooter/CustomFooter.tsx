// Nextjs and react

// Mantine
import { Group, Text } from "@mantine/core";
import Image from "next/image";

// Web3

// Custom

const CustomFooter = () => {
  return (
    <Group>
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <Text>Arins {new Date().getFullYear()}</Text>
    </Group>
  );
};

export default CustomFooter;
