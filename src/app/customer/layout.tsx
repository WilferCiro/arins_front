import AdminAuthLayout from "@/presentation/components/organisms/AdminAuthLayout";

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
