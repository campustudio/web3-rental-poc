'use client';
import { useConnectWalletMutation } from '@/features/wallet/walletApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { disconnectWallet, setWallet } from '@/features/wallet/walletSlice';
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

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#wallet-menu-root')) setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [open]);

  const short = (addr: string) => addr.slice(0, 6) + '…' + addr.slice(-4);
  const explorerUrl = (network: string | null, address: string) => {
    const n = (network || '').toLowerCase();
    if (n.includes('sepolia')) return `https://sepolia.etherscan.io/address/${address}`;
    if (n.includes('goerli')) return `https://goerli.etherscan.io/address/${address}`;
    if (n.includes('polygon')) return `https://polygonscan.com/address/${address}`;
    return `https://etherscan.io/address/${address}`;
  };

  // Avoid green-to-menu flicker before wallet is hydrated
  if (!mounted || !hydrated) {
    return <div className="px-4 py-2 rounded-xl min-w-[132px] h-10 inline-flex items-center justify-center opacity-0">\u00A0</div>;
  }

  // Disconnected -> green connect button
  if (!wallet.address) {
    return (
      <button
        onClick={handleConnect}
        className="px-4 py-2 rounded-xl inline-flex items-center justify-center gap-2 min-w-[132px] h-10 whitespace-nowrap leading-none bg-green-600 text-white hover:brightness-110"
        disabled={isLoading}
        title="Wallet"
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  // Connected -> dropdown menu
  return (
    <div id="wallet-menu-root" className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 rounded-xl inline-flex items-center justify-center gap-2 min-w-[132px] h-10 whitespace-nowrap leading-none bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        title={wallet.address || 'Wallet'}
      >
        <span className="font-medium">{short(wallet.address)}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50">
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(wallet.address!);
                show({ type: 'success', title: 'Wallet', message: 'Address copied' });
                setOpen(false);
              } catch {
                show({ type: 'error', title: 'Wallet', message: 'Copy failed' });
              }
            }}
          >
            Copy address
          </button>
          <a
            className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            href={explorerUrl(wallet.network, wallet.address)}
            target="_blank" rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            View on Explorer
          </a>
        </div>
      )}
    </div>
  );
}
