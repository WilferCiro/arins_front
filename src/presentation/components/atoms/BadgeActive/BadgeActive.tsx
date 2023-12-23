import { Badge } from "@mantine/core";

interface Props {
  active: boolean;
}

const BadgeActive = ({ active }: Props) => {
  return <>{active ? <Badge color="green">Activo</Badge> : <Badge color="red">Inactivo</Badge>}</>
}

export default BadgeActive;