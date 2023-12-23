import UserAuthLayout from "@/presentation/components/organisms/UserAuthLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserAuthLayout>{children}</UserAuthLayout>;
}
