import getDateString from "@/domain/adapters/getDateString";
import { UserCertSchema } from "@/domain/schemas/UserCertSchema";
import {
  Button,
  Card,
  Flex,
  Title,
} from "@mantine/core";
import IPFSImage from "@/presentation/components/atoms/IPFSImage";

const CertItem = (certData: UserCertSchema) => {
  return (
    <Card mb="sm" p="xl" withBorder>
      <Flex align="center" gap="xl" w="100%">
        <div>
          <IPFSImage url={certData.metadata.image} tokenId={certData.tokenId} />
        </div>
        <div>
          <Title order={3}>{certData.metadata?.name}</Title>
          {getDateString(certData.lastMetadataSync)}<br />
          Token id: {certData.tokenId}
          <Flex align="center" gap="md" w="100%">
            <Button onClick={() => alert(JSON.stringify(certData.metadata))}>
              Ver contenido
            </Button>
          </Flex>
        </div>
      </Flex>
    </Card>
  );
};

export default CertItem;
