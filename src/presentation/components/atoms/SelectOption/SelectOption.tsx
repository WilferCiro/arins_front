import { Group, Text } from "@mantine/core";
import { forwardRef } from "react";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description?: string;
}

const SelectOption = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group wrap="nowrap">
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

SelectOption.displayName = "SelectOption";

export default SelectOption;
