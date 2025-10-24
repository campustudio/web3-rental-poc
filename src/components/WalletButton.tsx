'use client';
import { useConnectWalletMutation } from '@/features/wallet/walletApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWallet } from '@/features/wallet/walletSlice';

export default function WalletButton() {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector((s) => s.wallet);
  const [connectWallet, { isLoading }] = useConnectWalletMutation();

  const handleConnect = async () => {
    try {
      const data = await connectWallet({}).unwrap();
      dispatch(setWallet(data));
    } catch (e: any) {
      const msg = e?.error || e?.message || 'Failed to connect wallet';
      alert(msg);
    }
  };

  return (
    <button onClick={handleConnect} className="bg-green-600 text-white px-4 py-2 rounded-xl" disabled={isLoading}>
      {isLoading ? 'Connecting...' : wallet.address ? 'Connected' : 'Connect Wallet'}
    </button>
  );
}
