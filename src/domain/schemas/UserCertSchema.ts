export interface UserCertSchema {
  tokenId: string | number;
  metadata: {
    name?: string;
    image?: string;
  };
  tokenURI: string;
  name: string;
  lastMetadataSync?: string;
  address?: string;
}
