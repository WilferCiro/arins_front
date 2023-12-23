// Nextjs and react
import { Montserrat } from "next/font/google";

// Mantine
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

// Web3

// Custom
import AllProviders from "@/presentation/components/organisms/AllProviders/AllProviders";
import "./globals.css";

const inter = Montserrat({
  subsets: ["latin"],
  variable: "--font-monserrat",
  display: "swap",
});

export const metadata = {
  title: "Arins :: dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
