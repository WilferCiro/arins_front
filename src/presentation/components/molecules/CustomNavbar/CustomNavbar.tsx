import { NavLink } from "@mantine/core";
import { IconHome2 } from "@tabler/icons-react";
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
        href="/admin/dependencies"
        label="Dependencias"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/admin/assets"
        label="Activos"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        component={Link}
        href="/admin/reports"
        label="Reportes"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
    </>
  );
};

export default CustomNavbar;
