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
  Burger,
  Group,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";

//Custom
import { signOut } from "next-auth/react";
import { nprogress } from "@mantine/nprogress";
import Image from "next/image";
import CompanySelector from "../../molecules/CompanySelector/CompanySelector";
import { useContext } from "react";
import { ContextAuth } from "@/presentation/context/ContextAuth";

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
        <div style={{ width: "140px" }}>
          <Image src="/logo_header.png" alt="Logo" width={32} height={32} />
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
