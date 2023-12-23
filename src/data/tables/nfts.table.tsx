"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { UserCertSchema } from "@/domain/schemas/UserCertSchema";
import { Button } from "@mantine/core";
import Link from "next/link";
import { Column } from "react-table";
import IPFSImage from "@/presentation/components/atoms/IPFSImage";

export const getTableNftDefinition = (): Column<UserCertSchema>[] => {
  return [
    {
      Header: "ID",
      accessor: "tokenId",
    },
    {
      Header: "Estudiante",
      accessor: "metadata",
      id: "student",
      Cell: ({ cell: { value } }) => {
        return <>{value?.name}</>;
      },
    },
    {
      Header: "Certificado",
      accessor: "metadata",
      id: "cert",
      Cell: ({ cell }) => {
        return (
          <IPFSImage
            url={cell.value.image}
            tokenId={cell.row.original.tokenId}
          />
        );
      },
    },
    {
      Header: "Dirección",
      accessor: "address",
    },
    {
      Header: "Token URI",
      accessor: "tokenURI",
      Cell: ({ cell: { value } }) => {
        return (
          <Link href={value || ""} target="_blank">
            <Button>Ver certificado</Button>
          </Link>
        );
      },
    },
    {
      Header: "Token fecha",
      accessor: "lastMetadataSync",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};
