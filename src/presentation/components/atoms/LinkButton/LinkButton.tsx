import { ActionIcon, Tooltip } from "@mantine/core";
import { IconLink, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  href: string;
  tooltip: string;
  target: string;
}

const LinkButton = ({ href, tooltip, target = "_blank" }: Props) => {
  return (
    <Tooltip label={tooltip}>
      <Link href={href} target={target}>
        <ActionIcon variant="light">
          <IconLink size="1.125rem" />
        </ActionIcon>
      </Link>
    </Tooltip>
  );
};

export default LinkButton;
