import AdminAuthLayout from "@/presentation/components/templates/AdminAuthLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminAuthLayout>{children}</AdminAuthLayout>
    </>
  );
}
