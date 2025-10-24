import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WalletState = { address: string | null; network: string | null; status: 'connected' | 'disconnected' };
const initialState: WalletState = { address: null, network: null, status: 'disconnected' };

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<{ address: string; network: string }>) => {
      state.address = action.payload.address;
      state.network = action.payload.network;
      state.status = 'connected';
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.network = null;
      state.status = 'disconnected';
    },
  },
});
export const { setWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
