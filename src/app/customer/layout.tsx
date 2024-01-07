import { getAccessCompanyServiceServer } from "@/data/services/server/company.server.services";
import AdminAuthLayout from "@/presentation/components/templates/AdminAuthLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await getAccessCompanyServiceServer();

  return (
    <>
      <AdminAuthLayout access={access}>{children}</AdminAuthLayout>
    </>
  );
}
