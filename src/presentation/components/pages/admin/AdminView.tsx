"use client";
// Nextjs and react
import { useMutation } from "react-query";
import Link from "next/link";

// Mantine
import { Divider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconFileCertificate } from "@tabler/icons-react";

// Web3

// Custom
import PageTitle from "@/presentation/components/atoms/PageTitle";
import { generateCert, updateCert } from "@/data/services/cert.services";
import TableCertificates from "@/presentation/components/organisms/TableCertificates";
import CertSchema from "@/domain/schemas/CertSchema";

const AdminView = () => {
  const mutation = useMutation({
    mutationFn: generateCert,
    onError: (error: { message: string }) => {
      notifications.show({
        color: "red",
        message: error.message,
      });
    },
    onSuccess: (data) => {
      notifications.show({
        color: "green",
        autoClose: false,
        message: <>BIEN</>,
      });
    },
  });

  const mutationEdit = useMutation({
    mutationFn: updateCert,
    onError: (error: { message: string }) => {
      notifications.show({
        color: "red",
        message: error.message,
      });
    },
  });

  const onEdit = async (data: CertSchema, original: CertSchema) => {
    const result = await mutationEdit.mutateAsync({
      ...data,
      tokenURI: original.tokenURI,
      fromAddress: original.address,
      tokenId: original.tokenId,
    });
    return result ? true : false;
  };

  const onAdd = async (data: CertSchema) => {
    const result = await mutation.mutateAsync(data);
    return result ? true : false;
  };

  return (
    <>
      <PageTitle
        title={"Listado de activos"}
        subtitle="Administra los activos de tu compañía"
        icon={<IconFileCertificate />}
      />
      <Divider m="lg" />

      <TableCertificates onAdd={onAdd} onEdit={onEdit} />
    </>
  );
};

export default AdminView;
