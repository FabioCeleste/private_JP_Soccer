'use client';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useChains } from 'wagmi';
import { Wallet, LogOut, PenLine } from 'lucide-react';
import SignMessageModal from './SignMessageModal';
import { useSignMessage } from '@/hooks/useSignMessage';

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function WalletButton() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const configuredChains = useChains();

  const { isOpen, message, openModal, closeModal, sign, signature, error, isPending } = useSignMessage();

  const isNetworkSupported = !!chain && configuredChains.some((c) => c.id === chain.id);
  const chainLabel = chain?.name ?? 'Wrong Network';

  /* ── Disconnected ─────────────────────────────────────────────────────── */
  if (!isConnected || !address) {
    return (
      <button
        onClick={openConnectModal}
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded-lg transition-colors duration-200 shadow-md"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </button>
    );
  }

  /* ── Connected ─────────────────────────────────────────────────────────── */
  return (
    <>
      <div className="hidden md:flex items-center gap-1 bg-zinc-900/80 border border-yellow-500/20 rounded-lg px-2 py-1.5">
        {/* Network indicator dot */}
        <span
          className={`h-2 w-2 rounded-full shrink-0 ${
            isNetworkSupported ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
          }`}
          title={isNetworkSupported ? chainLabel : 'Unsupported network'}
        />

        {/* Chain name */}
        <span
          className={`text-xs font-medium px-1 ${
            isNetworkSupported ? 'text-zinc-400' : 'text-yellow-400'
          }`}
        >
          {chainLabel}
        </span>

        {/* Separator */}
        <span className="text-zinc-700 px-0.5">|</span>

        {/* Address badge */}
        <span className="text-xs font-mono text-yellow-200 px-1">
          {shortenAddress(address)}
        </span>

        {/* Sign button */}
        <button
          onClick={openModal}
          title="Sign in to JP Soccer"
          className="p-1.5 text-zinc-400 hover:text-yellow-200 hover:bg-yellow-500/10 rounded transition-colors"
        >
          <PenLine className="h-3.5 w-3.5" />
        </button>

        {/* Disconnect button */}
        <button
          onClick={() => disconnect()}
          title="Disconnect wallet"
          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>

      <SignMessageModal
        isOpen={isOpen}
        message={message}
        onClose={closeModal}
        onSign={sign}
        signature={signature}
        error={error}
        isPending={isPending}
      />
    </>
  );
}
