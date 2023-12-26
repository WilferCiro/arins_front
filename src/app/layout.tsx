// Nextjs and react
import { Montserrat } from "next/font/google";

// Mantine
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/dates/styles.css";

// Web3

// Custom
import AllProviders from "@/presentation/components/organisms/AllProviders/AllProviders";
import "./globals.css";
import Head from "next/head";

const inter = Montserrat({
  subsets: ["latin"],
  variable: "--font-monserrat",
  display: "swap",
});

export const metadata = {
  title: "Arins :: dashboard",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
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
