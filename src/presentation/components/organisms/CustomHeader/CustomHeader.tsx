// Nextjs y react
import { useRouter } from "next/navigation";

// Mantine
import {
  IconDoor,
  IconMoonStars,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import {
  Avatar,
  Box,
  Burger,
  Group,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";

//Custom
import Image from "next/image";
import CompanySelector from "../../molecules/CompanySelector/CompanySelector";
import { useContext } from "react";
import { ContextAuth } from "@/presentation/context/ContextAuth";
import styles from "./styles.module.css";

interface Props {
  toggleDesktop?: () => void;
  desktopOpened?: boolean;
  toggleMobile?: () => void;
  mobileOpened?: boolean;
}

const CustomHeader = ({
  desktopOpened,
  toggleDesktop,
  toggleMobile,
  mobileOpened,
}: Props) => {
  const { logout } = useContext(ContextAuth);
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const closeSession = () => {
    logout();
    router.replace("/login");
  };

  const goToProfile = () => {
    router.replace("/customer/profile");
  };

  return (
    <Group
      h="100%"
      px="md"
      justify="space-between"
      bg="var(--mantine-color-gray-light)"
    >
      <Group h="100%" px="md">
        <>
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
            style={{ display: desktopOpened ? "none" : "block" }}
          />
        </>
        <div className={styles.logo}>
          <Image
            src="/images/logos/logo_large.png"
            alt="Logo"
            width={99}
            height={40}
          />
        </div>
      </Group>

      <Group>
        <CompanySelector />
        <Menu width={200} shadow="md">
          <Menu.Target>
            <Avatar radius="xl" color="cyan">
              <IconUser />
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                dark ? (
                  <IconSun size="1.1rem" />
                ) : (
                  <IconMoonStars size="1.1rem" />
                )
              }
              component="button"
              onClick={() => toggleColorScheme()}
            >
              {dark ? <>Cambiar a claro</> : <>Cambiar a oscuro</>}
            </Menu.Item>
            <Menu.Item
              leftSection={<IconUser size="1.1rem" />}
              component="button"
              onClick={() => goToProfile()}
            >
              Mi perfil
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={<IconDoor size="1.1rem" />}
              component="button"
              onClick={() => closeSession()}
            >
              Cerrar sesión
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default CustomHeader;
