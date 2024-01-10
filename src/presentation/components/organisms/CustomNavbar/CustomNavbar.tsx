"use client";
import { Badge, Burger, Group, NavLink } from "@mantine/core";
import { IconDoorExit, IconHelp } from "@tabler/icons-react";
import {
  IconAsset,
  IconBox,
  IconBuilding,
  IconBuildingCommunity,
  IconBuildingStore,
  IconCashBanknote,
  IconDoorEnter,
  IconFile,
  IconHome2,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import { useAccess } from "@/presentation/context/ContextAccess";
interface Props {
  toggleDesktop?: () => void;
  desktopOpened?: boolean;
}
const CustomNavbar = ({ desktopOpened, toggleDesktop }: Props) => {
  const pathname = usePathname();
  const { access } = useAccess();

  const disabledInventory = !access?.inventory?.active;
  const disabledSales = !access?.sales?.active;

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
        href="/customer/"
        label="Inicio"
        color="red"
        active={pathname === "/customer"}
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
        className={styles.link}
      />
      {/*<NavLink
        component={Link}
        href="/admin/companies"
        label="Compañías"
        color="red"
        active={pathname === "/admin/companies"}
        leftSection={<IconBuilding size="1rem" stroke={1.5} />}
        className={styles.link}
      />
      <NavLink
        component={Link}
        href="/admin/users"
        label="Usuarios"
        color="red"
        active={pathname === "/admin/users"}
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
        className={styles.link}
  />*/}
      <NavLink
        component={Link}
        href="/customer/company"
        label="Compañía"
        color="red"
        active={pathname === "/customer/company"}
        leftSection={<IconBuilding size="1rem" stroke={1.5} />}
        className={styles.link}
      />

      <NavLink
        href="#required-for-focus"
        label="Gestión de inventarios"
        leftSection={<IconBox size="1rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened={true}
        color="green"
        active={[
          "/customer/inventory/dependencies",
          "/customer/inventory/assets",
          "/customer/inventory/reports",
        ].includes(pathname || "")}
        variant="subtle"
        className={styles.link}
        disabled={disabledInventory}
      >
        <NavLink
          component={Link}
          href="/customer/inventory/dependencies"
          label="Dependencias"
          color="green"
          active={pathname === "/customer/inventory/dependencies"}
          leftSection={<IconBuildingCommunity size="1rem" stroke={1.5} />}
          className={styles.link}
          disabled={disabledInventory}
        />
        <NavLink
          component={Link}
          href="/customer/inventory/assets"
          label="Activos"
          color="green"
          active={pathname === "/customer/inventory/assets"}
          leftSection={<IconAsset size="1rem" stroke={1.5} />}
          className={styles.link}
          disabled={disabledInventory}
        />
        <NavLink
          component={Link}
          href="/customer/inventory/reports"
          label="Reportes"
          color="green"
          active={pathname === "/customer/inventory/reports"}
          leftSection={<IconFile size="1rem" stroke={1.5} />}
          className={styles.link}
          disabled={disabledInventory}
        />
      </NavLink>
      <NavLink
        href="#required-for-focus"
        label="Gestión de ventas"
        leftSection={<IconBox size="1rem" stroke={1.5} />}
        childrenOffset={28}
        color="blue"
        defaultOpened={true}
        active={[
          "/customer/sales/stores",
          "/customer/sales/products",
          "/customer/sales/sales",
          "/customer/sales/product_reports",
        ].includes(pathname || "")}
        variant="subtle"
        className={styles.link}
        disabled={disabledSales}
      >
        <NavLink
          component={Link}
          href="/customer/sales/stores"
          label="Bodegas"
          color="blue"
          active={pathname === "/customer/sales/stores"}
          leftSection={<IconBuildingStore size="1rem" stroke={1.5} />}
          className={styles.link}
          disabled={disabledSales}
        />
        <NavLink
          component={Link}
          href="/customer/sales/products"
          label="Productos"
          color="blue"
          active={pathname === "/customer/sales/products"}
          leftSection={<IconBox size="1rem" stroke={1.5} />}
          className={styles.link}
          disabled={disabledSales}
        />
        <NavLink
          component={Link}
          href="/customer/sales/sales"
          label="Ventas"
          color="blue"
          active={pathname === "/customer/sales/sales"}
          leftSection={<IconCashBanknote size="1rem" stroke={1.5} />}
          className={styles.link}
          disabled={disabledSales}
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
      <NavLink
        disabled={true}
        label={
          <>
            Gestión de ingreso{" "}
            <Badge color="yellow" size="sm">
              soon
            </Badge>
          </>
        }
        leftSection={<IconDoorEnter size="1rem" stroke={1.5} />}
        childrenOffset={28}
        color="red"
        defaultOpened={true}
        active={["#construct"].includes(pathname || "")}
        variant="subtle"
        className={styles.link}
      >
        <NavLink
          disabled={true}
          component={Link}
          href="#construct"
          label={
            <>
              Usuarios{" "}
              <Badge color="yellow" size="sm">
                soon
              </Badge>
            </>
          }
          color="red"
          active={pathname === "/customer/ingress"}
          leftSection={<IconUser size="1rem" stroke={1.5} />}
          className={styles.link}
        />
        <NavLink
          disabled={true}
          component={Link}
          href="#construct"
          label={
            <>
              Ingresos{" "}
              <Badge color="yellow" size="sm">
                soon
              </Badge>
            </>
          }
          color="red"
          active={pathname === "/customer/ingress"}
          leftSection={<IconDoorExit size="1rem" stroke={1.5} />}
          className={styles.link}
        />
      </NavLink>
      <NavLink
        disabled={true}
        component={Link}
        href="/customer/help"
        label={
          <>
            Ayuda{" "}
            <Badge color="pink" size="sm">
              soon
            </Badge>
          </>
        }
        color="pink"
        active={pathname === "/customer/help"}
        leftSection={<IconHelp size="1rem" stroke={1.5} />}
        className={styles.link}
      />
    </>
  );
};

export default CustomNavbar;
