import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getCertCreationFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "ethereum",
      name: "address",
      label: "Dirección",
      placeholder: "Dirección 0x8....",
      required: true,
      initialValue: "0x8d4e9Ad1DE5516fd5d75B96b021Dd73F99FD79d6",
    },
    {
      type: "ipfs",
      name: "tokenURI",
      label: "Certificado",
      placeholder: "Certificado",
      required: true,
      initialValue: "ipfs://QmUcyjJPwh8C9p9wosBzgwLH88VnzXtxFMzVUquJSN4FYh",
    },
  ];

  return fields;
};


export const getCertUpdateFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "tokenId",
      label: "TokenID",
      placeholder: "TokenID",
      required: true,
      disabled: true,
    },
    {
      type: "ethereum",
      name: "address",
      label: "Dirección donde transferir",
      placeholder: "Dirección receptora 0x8....",
      required: true,
      initialValue: "0x8d4e9Ad1DE5516fd5d75B96b021Dd73F99FD79d6",
    },
    {
      type: "ipfs",
      name: "tokenURI",
      label: "Certificado",
      placeholder: "Certificado",
      required: true,
      initialValue: "ipfs://QmUcyjJPwh8C9p9wosBzgwLH88VnzXtxFMzVUquJSN4FYh",
      disabled: true,
    },
  ];

  return fields;
};

export const getCertValidateFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "tokenId",
      label: "Token ID",
      placeholder: "Token ID",
      required: true,
      initialValue: "1",
    },
  ];

  return fields;
};