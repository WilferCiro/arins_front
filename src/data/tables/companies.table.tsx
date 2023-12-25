"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Button } from "@mantine/core";
import Link from "next/link";
import { Column } from "react-table";
import { CompanySchema } from "@/domain/schemas/CompanySchema";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import LinkButton from "@/presentation/components/atoms/LinkButton";

export const getCompaniesTableDefinition = (): Column<CompanySchema>[] => {
  return [
    {
      Header: "Estado",
      accessor: "active",
      Cell: ({ cell: { value } }) => {
        return <BadgeActive active={value} />;
      },
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Nit",
      accessor: "nit",
    },
    {
      Header: "Celular",
      accessor: "cellphone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Web",
      accessor: "webpage",
      Cell: ({ cell: { value } }) => {
        if (!value || value.length === 0) {
          return <>-</>;
        }
        return (
          <LinkButton
            href={value || ""}
            tooltip="Visitar página web"
            target="_blank"
          />
        );
      },
    },
    {
      Header: "Tipo",
      accessor: "type",
    },
    {
      Header: "Creada",
      accessor: "createdAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
    {
      Header: "Actualizada",
      accessor: "updatedAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};
