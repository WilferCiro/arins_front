import { NavLink } from "@mantine/core";
import {
  IconAsset,
  IconBox,
  IconBuilding,
  IconBuildingCommunity,
  IconFile,
  IconHome2,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";

const CustomNavbar = () => {
  return (
    <>
      <NavLink
        component={Link}
        href="/admin/"
        label="Inicio"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/admin/companies"
        label="Compañías"
        leftSection={<IconBuilding size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/admin/users"
        label="Usuarios"
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/customer/dependencies"
        label="Dependencias"
        leftSection={<IconBuildingCommunity size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/customer/assets"
        label="Activos"
        leftSection={<IconAsset size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/customer/products"
        label="Products"
        leftSection={<IconBox size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/customer/reports"
        label="Reportes"
        leftSection={<IconFile size="1rem" stroke={1.5} />}
      />
    </>
  );
};

export default CustomNavbar;
