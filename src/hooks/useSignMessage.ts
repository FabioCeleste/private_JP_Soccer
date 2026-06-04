import { useState } from 'react';
import { useSignMessage as useWagmiSignMessage } from 'wagmi';

export interface SignState {
  isOpen: boolean;
  message: string | null;
  signature: string | null;
  error: string | null;
  isPending: boolean;
}

export function useSignMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { signMessageAsync, isPending } = useWagmiSignMessage();

  function openModal() {
    // Compute the message once on open so preview and signed payload are identical
    setMessage(`Sign in to JP Soccer\n\nTimestamp: ${new Date().toISOString()}`);
    setSignature(null);
    setError(null);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function sign() {
    if (!message) return;
    try {
      const sig = await signMessageAsync({ message });
      setSignature(sig);
      setError(null);
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      // Normalise user-rejection messages from both MetaMask and WalletConnect
      const isRejection =
        raw.toLowerCase().includes('user rejected') ||
        raw.toLowerCase().includes('user denied') ||
        raw.toLowerCase().includes('rejected by user');
      setError(isRejection ? 'Signature rejected by user.' : `Signing failed: ${raw}`);
    }
  }

  return { isOpen, message, openModal, closeModal, sign, signature, error, isPending };
}
