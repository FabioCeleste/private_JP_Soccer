'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface SignMessageModalProps {
  isOpen: boolean;
  message: string | null;
  onClose: () => void;
  onSign: () => void;
  signature: string | null;
  error: string | null;
  isPending: boolean;
}

function truncateSig(sig: string): string {
  return `${sig.slice(0, 20)}...${sig.slice(-10)}`;
}

export default function SignMessageModal({
  isOpen,
  message,
  onClose,
  onSign,
  signature,
  error,
  isPending,
}: SignMessageModalProps) {
  // Track whether we're mounted on the client so createPortal is safe to call.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!isOpen || !mounted) return null;

  const modal = (
    /* Backdrop — clicking outside the card closes the modal.
       Rendered via portal directly into document.body so the Header's
       backdrop-filter stacking context cannot clip the fixed overlay. */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Card — stop propagation so clicking the card does NOT close */}
      <div
        className="relative w-full max-w-sm mx-4 bg-zinc-950 border border-yellow-500/30 rounded-xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-yellow-200 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold text-yellow-100 mb-1">Sign in to JP Soccer</h2>
        <p className="text-sm text-zinc-400 mb-6">
          This request will not trigger a blockchain transaction or cost any gas.
        </p>

        {/* Message preview — same string that will be signed */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 mb-6 font-mono text-xs text-zinc-300 whitespace-pre-wrap">
          {message}
        </div>

        {/* Success state */}
        {signature && (
          <div className="mb-4 rounded-lg bg-green-950/40 border border-green-500/30 p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
              <span className="text-xs font-semibold text-green-300 uppercase tracking-wider">Verified</span>
            </div>
            <p className="text-xs text-zinc-400 break-all font-mono">{truncateSig(signature)}</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-950/40 border border-red-500/30 p-3 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-xs text-red-300">{error}</p>
          </div>
        )}

        {/* Action button */}
        {!signature ? (
          <button
            onClick={onSign}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-lg py-3 text-sm transition-colors"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Waiting for wallet…
              </>
            ) : (
              'Sign Message'
            )}
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-yellow-100 font-semibold rounded-lg py-3 text-sm transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
