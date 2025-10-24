'use client';
import { useConnectWalletMutation } from '@/features/wallet/walletApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWallet } from '@/features/wallet/walletSlice';
import { useToast } from '@/components/ui/ToastProvider';
import useMounted from '@/hooks/useMounted';
import { useEffect, useState } from 'react';

export default function WalletButton() {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector((s) => s.wallet);
  const [connectWallet, { isLoading }] = useConnectWalletMutation();
  const { show } = useToast();
  const mounted = useMounted();

  // Wait for WalletHydrator to finish to avoid Connect->Connected flicker
  const [hydrated, setHydrated] = useState<boolean>(
    typeof document !== 'undefined' && document.documentElement.dataset.walletHydrated === '1'
  );
  useEffect(() => {
    const handler = () => setHydrated(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('walletHydrated', handler as EventListener);
    }
    // also poll dataset in case event missed
    if (!hydrated && typeof document !== 'undefined' && document.documentElement.dataset.walletHydrated === '1') {
      setHydrated(true);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('walletHydrated', handler as EventListener);
      }
    };
  }, [hydrated]);

  const handleConnect = async () => {
    try {
      const data = await connectWallet({}).unwrap();
      dispatch(setWallet(data));
    } catch (e: any) {
      const msg = e?.error || e?.message || 'Failed to connect wallet';
      show({ type: 'error', title: 'Wallet', message: String(msg) });
    }
  };

  const label = !mounted || !hydrated ? '\u00A0' : isLoading ? 'Connecting...' : wallet.address ? 'Connected' : 'Connect Wallet';

  return (
    <button onClick={handleConnect} className="bg-green-600 text-white px-4 py-2 rounded-xl min-w-32 sm:min-w-36 h-10 whitespace-nowrap" disabled={isLoading} title="Wallet">
      {label}
    </button>
  );
}

