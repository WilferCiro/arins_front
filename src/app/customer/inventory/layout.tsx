"use client";

import getDateString from "@/domain/adapters/getDateString";
import { useAccess } from "@/presentation/context/ContextAccess";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { access } = useAccess();
  const disabledSales = !access?.inventory?.active;

  if (disabledSales) {
    return (
      <Alert title="Suscripción vencida" icon={<IconAlertCircle />}>
        {access?.inventory?.expiration ? (
          <>
            Tu suscripción al módulo de ventas se venció en la fecha:{" "}
            {getDateString(access?.inventory?.expiration)}
          </>
        ) : (
          <>
            No tienes adquirido el módulo de ventas, por favor contacta con
            soporte para adquirir el módulo
          </>
        )}
      </Alert>
    );
  }

  return <>{children}</>;
}
