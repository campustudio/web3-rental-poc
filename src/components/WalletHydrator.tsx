'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setWallet, disconnectWallet } from '@/features/wallet/walletSlice';
import { getConnectedWallet } from '@/lib/blockchain';

export default function WalletHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const info = await getConnectedWallet();
        if (!mounted) return;
        if (info) dispatch(setWallet(info));
      } catch {
        // ignore
      } finally {
        if (typeof document !== 'undefined') {
          document.documentElement.dataset.walletHydrated = '1';
        }
        if (typeof window !== 'undefined') {
          try { window.dispatchEvent(new CustomEvent('walletHydrated')); } catch {}
        }
      }
    };

    hydrate();

    const eth = (typeof window !== 'undefined' && (window as any).ethereum) || null;
    if (eth) {
      const onAccountsChanged = (accounts: string[]) => {
        if (!accounts || accounts.length === 0) {
          dispatch(disconnectWallet());
        } else {
          hydrate();
        }
      };
      const onChainChanged = () => hydrate();

      eth.on?.('accountsChanged', onAccountsChanged);
      eth.on?.('chainChanged', onChainChanged);

      return () => {
        mounted = false;
        eth.removeListener?.('accountsChanged', onAccountsChanged);
        eth.removeListener?.('chainChanged', onChainChanged);
      };
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return null;
}
