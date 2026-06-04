'use client';

import { ReactNode } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

// Deep-merges RainbowKit's dark base with the project's black/yellow palette.
// `merge` is not exported in @rainbow-me/rainbowkit v2 — use spread instead.
const base = darkTheme();
const jpSoccerTheme = {
  ...base,
  colors: {
    ...base.colors,
    accentColor: '#eab308',              // yellow-500: buttons, highlights
    accentColorForeground: '#000000',    // text on yellow
    connectButtonBackground: '#000000',
    connectButtonInnerBackground: '#18181b',
    connectButtonText: '#fef9c3',        // yellow-100
    connectButtonTextError: '#ef4444',
    error: '#ef4444',
    generalBorder: 'rgba(234,179,8,0.2)',
    generalBorderDim: 'rgba(234,179,8,0.08)',
    menuItemBackground: '#18181b',
    modalBackground: '#09090b',
    modalBorder: 'rgba(234,179,8,0.2)',
    modalText: '#fef9c3',
    modalTextDim: '#a16207',
    modalTextSecondary: '#ca8a04',
    closeButton: '#a3a3a3',
    closeButtonBackground: '#27272a',
    profileAction: '#18181b',
    profileActionHover: '#27272a',
    profileForeground: '#09090b',
    selectedOptionBorder: '2px solid rgba(234,179,8,0.4)',
    standby: '#eab308',
  },
  fonts: {
    body: 'Inter, system-ui, -apple-system, sans-serif',
  },
  radii: {
    ...base.radii,
    connectButton: '8px',
    actionButton: '8px',
    menuButton: '8px',
    modal: '12px',
    modalMobile: '16px',
  },
  shadows: {
    ...base.shadows,
    connectButton: '0 4px 6px -1px rgba(0,0,0,0.5)',
    dialog: '0 25px 50px -12px rgba(0,0,0,0.9)',
    profileDetailsAction: '0 2px 6px rgba(0,0,0,0.3)',
    selectedWallet: '0 0 0 1px rgba(234,179,8,0.4)',
    walletLogo: '0 2px 4px rgba(0,0,0,0.5)',
  },
};

export default function Web3Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={jpSoccerTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
