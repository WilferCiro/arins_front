"use client";

// Nextjs and react
import { QueryClient, QueryClientProvider } from "react-query";

// Mantine
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { generateColors } from "@mantine/colors-generator";
import "dayjs/locale/es";

// Web3
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";

// Custom
import { ContextProviderAuth } from "@/presentation/context/ContextAuth";
import { DatesProvider } from "@mantine/dates";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

// TODO: move to another file in data
const theme = createTheme({
  primaryColor: "primary",
  defaultRadius: "10px",
  fontFamily: "var(--font-monserrat)",
  colors: {
    primary: generateColors("orangered"),
    secondary: [
      "#00438b",
      "#00438b",
      "#00438b",
      "#00438b",
      "#00438b",
      "#00438b",
      "#00438b",
      "#00438b",
      "#00438b",
      "#00438b",
    ],
  },
});

export default function AllProviders({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: { name: string; value: string }[] | undefined;
}) {
  const queryClient = new QueryClient();

  return (
    <ContextProviderAuth cookies={cookies}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <ColorSchemeScript />
          <DatesProvider
            settings={{
              locale: "es",
              firstDayOfWeek: 0,
              weekendDays: [0],
              timezone: "UTC",
            }}
          >
            <MantineProvider theme={theme}>
              <Notifications position="top-center" limit={3} zIndex={1000} />
              {children}
            </MantineProvider>
          </DatesProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ContextProviderAuth>
  );
}
