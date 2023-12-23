export default interface CertSchema {
  tokenId?: string;
  address: string;
  tokenURI: string;
}

export interface CertificateResponse {
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  from: string;
}