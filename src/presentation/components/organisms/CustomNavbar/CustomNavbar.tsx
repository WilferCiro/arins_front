"use client";
import { Burger, Group, NavLink } from "@mantine/core";
import {
  IconAsset,
  IconBox,
  IconBuilding,
  IconBuildingCommunity,
  IconBuildingStore,
  IconCashBanknote,
  IconDoor,
  IconDoorEnter,
  IconFile,
  IconHome2,
  IconPdf,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  toggleDesktop?: () => void;
  desktopOpened?: boolean;
}
const CustomNavbar = ({ desktopOpened, toggleDesktop }: Props) => {
  const pathname = usePathname();
  return (
    <>
      <Group w="100%" px="md" justify="flex-end">
        <div>
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
        </div>
      </Group>
      <NavLink
        component={Link}
        href="/admin/"
        label="Inicio"
        color="red"
        active={pathname === "/admin"}
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/admin/companies"
        label="Compañías"
        color="red"
        active={pathname === "/admin/companies"}
        leftSection={<IconBuilding size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/admin/users"
        label="Usuarios"
        color="red"
        active={pathname === "/admin/users"}
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
      />

      <NavLink
        href="#required-for-focus"
        label="Gestión de inventarios"
        leftSection={<IconBox size="1rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened={true}
        color="green"
        active={[
          "/customer/dependencies",
          "/customer/assets",
          "/customer/reports",
        ].includes(pathname || "")}
        variant="subtle"
      >
        <NavLink
          component={Link}
          href="/customer/dependencies"
          label="Dependencias"
          color="green"
          active={pathname === "/customer/dependencies"}
          leftSection={<IconBuildingCommunity size="1rem" stroke={1.5} />}
        />
        <NavLink
          component={Link}
          href="/customer/assets"
          label="Activos"
          color="green"
          active={pathname === "/customer/assets"}
          leftSection={<IconAsset size="1rem" stroke={1.5} />}
        />
        <NavLink
          component={Link}
          href="/customer/reports"
          label="Reportes"
          color="green"
          active={pathname === "/customer/reports"}
          leftSection={<IconFile size="1rem" stroke={1.5} />}
        />
      </NavLink>
      <NavLink
        href="#required-for-focus"
        label="Gestión de productos"
        leftSection={<IconBox size="1rem" stroke={1.5} />}
        childrenOffset={28}
        color="blue"
        defaultOpened={true}
        active={[
          "/customer/stores",
          "/customer/products",
          "/customer/sales",
          "/customer/product_reports",
        ].includes(pathname || "")}
        variant="subtle"
      >
        <NavLink
          component={Link}
          href="/customer/stores"
          label="Bodegas"
          color="blue"
          active={pathname === "/customer/stores"}
          leftSection={<IconBuildingStore size="1rem" stroke={1.5} />}
        />
        <NavLink
          component={Link}
          href="/customer/products"
          label="Productos"
          color="blue"
          active={pathname === "/customer/products"}
          leftSection={<IconBox size="1rem" stroke={1.5} />}
        />
        <NavLink
          component={Link}
          href="/customer/sales"
          label="Ventas"
          color="blue"
          active={pathname === "/customer/sales"}
          leftSection={<IconCashBanknote size="1rem" stroke={1.5} />}
        />
        {/*<NavLink
          component={Link}
          href="/customer/product_reports"
          label="Reportes"
          color="blue"
          active={pathname === "/customer/product_reports"}
          leftSection={<IconPdf size="1rem" stroke={1.5} />}
      />*/}
      </NavLink>
      {/*<NavLink
        href="#required-for-focus"
        label="Gestión de ingreso"
        leftSection={<IconDoorEnter size="1rem" stroke={1.5} />}
        childrenOffset={28}
        color="red"
        defaultOpened={true}
        active={[
          "/customer/stores",
          "/customer/products",
          "/customer/sales",
          "/customer/product_reports",
        ].includes(pathname || "")}
        variant="subtle"
      >
        <NavLink
          component={Link}
          href="/customer/ingress"
          label="Usuarios"
          color="red"
          active={pathname === "/customer/ingress"}
          leftSection={<IconUser size="1rem" stroke={1.5} />}
        />
        <NavLink
          component={Link}
          href="/customer/ingress"
          label="Ingresos"
          color="red"
          active={pathname === "/customer/ingress"}
          leftSection={<IconUser size="1rem" stroke={1.5} />}
        />
      </NavLink>*/}
    </>
  );
};

export default CustomNavbar;
