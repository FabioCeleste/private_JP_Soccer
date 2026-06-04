import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, sepolia, polygonAmoy } from 'wagmi/chains';

export const SUPPORTED_CHAIN_IDS = [
  mainnet.id,    // 1
  polygon.id,    // 137
  sepolia.id,    // 11155111
  polygonAmoy.id, // 80002  (successor to Mumbai — Mumbai testnet was shut down Apr 2024)
] as const;

export const wagmiConfig = getDefaultConfig({
  appName: 'JP Soccer',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
  chains: [mainnet, polygon, sepolia, polygonAmoy],
  ssr: true, // required for Next.js App Router to avoid hydration mismatch
});
