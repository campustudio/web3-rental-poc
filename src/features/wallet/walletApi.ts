import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { connectWithMetaMask } from '@/lib/blockchain';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    connectWallet: builder.mutation<{ address: string; network: string }, {}>({
      async queryFn() {
        try {
          const data = await connectWithMetaMask();
          return { data };
        } catch (err: any) {
          return { error: { status: 'CUSTOM_ERROR', error: err.message } } as any;
        }
      },
    }),
  }),
});
export const { useConnectWalletMutation } = walletApi;
