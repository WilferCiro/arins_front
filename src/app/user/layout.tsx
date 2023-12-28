import UserAuthLayout from "@/presentation/components/templates/UserAuthLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserAuthLayout>{children}</UserAuthLayout>;
}
