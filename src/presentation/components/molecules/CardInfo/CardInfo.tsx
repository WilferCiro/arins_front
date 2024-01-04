import { Card, Flex, Text } from "@mantine/core";

interface Props {
  value: string;
  title: string;
  subtitle?: string;
}

const CardInfo = ({ value, title, subtitle }: Props) => {
  return (
    <Card withBorder w={"100%"}>
      <Flex direction={"column"}>
        <Text size="xl" fw={700}>
          {value}
        </Text>
        {subtitle && (
          <Text size="md" fw={400}>
            {subtitle}
          </Text>
        )}
        <Text ta="right">{title}</Text>
      </Flex>
    </Card>
  );
};

export default CardInfo;
