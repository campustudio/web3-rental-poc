export type WalletInfo = { address: string; network: string };

export async function connectWithMetaMask(): Promise<WalletInfo> {
  if (typeof window === 'undefined') {
    throw new Error('Window is undefined in SSR environment');
  }
  const eth = (window as any).ethereum;
  if (!eth) {
    throw new Error('MetaMask not installed');
  }
  await eth.request({ method: 'eth_requestAccounts' });
  const { ethers } = await import('ethers');
  const provider = new ethers.BrowserProvider(eth);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();
  return { address, network: String(network.name) };
}
