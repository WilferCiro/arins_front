import { Card, Flex, LoadingOverlay, Text } from "@mantine/core";

interface Props {
  value: string;
  title: string;
  subtitle?: string;
  loading?: boolean;
}

const CardInfo = ({ value, title, subtitle, loading }: Props) => {
  
  return (
    <Card withBorder w={"100%"}>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
