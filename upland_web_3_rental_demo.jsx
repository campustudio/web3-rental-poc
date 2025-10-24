/*
  Upland Web3 Real Estate Rental Platform (Demo)
  Built with React + Next.js + Redux Toolkit + RTK Query + Ethers.js + TailwindCSS + Framer Motion
*/

// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { walletApi } from '@/features/wallet/walletApi';
import { propertyApi } from '@/features/properties/propertyApi';
import walletReducer from '@/features/wallet/walletSlice';
import propertyReducer from '@/features/properties/propertySlice';
import themeReducer from '@/features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    properties: propertyReducer,
    theme: themeReducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(walletApi.middleware)
      .concat(propertyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// features/wallet/walletApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { ethers } from 'ethers';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    connectWallet: builder.mutation({
      async queryFn() {
        try {
          if (!window.ethereum) throw new Error('MetaMask not installed');
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const network = await provider.getNetwork();
          return { data: { address, network: network.name } };
        } catch (err: any) {
          return { error: { message: err.message } };
        }
      },
    }),
  }),
});
export const { useConnectWalletMutation } = walletApi;

// features/wallet/walletSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: null,
  network: null,
  status: 'disconnected',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action) => {
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

// features/properties/propertyApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => 'properties.json',
      providesTags: ['Property'],
    }),
    rentProperty: builder.mutation({
      async queryFn(property) {
        await new Promise((r) => setTimeout(r, 1500));
        return { data: { success: true, id: property.id } };
      },
      invalidatesTags: ['Property'],
    }),
  }),
});
export const { useGetPropertiesQuery, useRentPropertyMutation } = propertyApi;

// features/theme/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme:
    typeof window !== 'undefined' && localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        document.documentElement.dataset.theme = state.theme;
      }
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

// components/PropertyCard.tsx
'use client';
import { useRentPropertyMutation } from '@/features/properties/propertyApi';
import { motion } from 'framer-motion';

export default function PropertyCard({ property }: { property: any }) {
  const [rentProperty, { isLoading }] = useRentPropertyMutation();
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 transition"
      whileHover={{ scale: 1.03 }}
    >
      <img src={property.image} alt={property.name} className="rounded-xl mb-2" />
      <h3 className="font-semibold">{property.name}</h3>
      <p>{property.location}</p>
      <p className="text-sm text-gray-500">Rent: {property.price} ETH</p>
      <button
        onClick={() => rentProperty(property)}
        disabled={isLoading}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {isLoading ? 'Processing...' : 'Rent'}
      </button>
    </motion.div>
  );
}

// components/WalletButton.tsx
'use client';
import { useConnectWalletMutation } from '@/features/wallet/walletApi';
import { useAppDispatch } from '@/store/hooks';
import { setWallet } from '@/features/wallet/walletSlice';

export default function WalletButton() {
  const dispatch = useAppDispatch();
  const [connectWallet, { data, isLoading }] = useConnectWalletMutation();

  const handleConnect = async () => {
    const res: any = await connectWallet({});
    if (res.data) dispatch(setWallet(res.data));
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-green-600 text-white px-4 py-2 rounded-xl"
      disabled={isLoading}
    >
      {isLoading ? 'Connecting...' : data?.address ? 'Connected' : 'Connect Wallet'}
    </button>
  );
}

// README.md
# 🏠 Web3 Real Estate Rental Platform (Demo)

A minimal Web3 rental platform demo built with **React + Next.js + Redux Toolkit + RTK Query + Ethers.js**.

### ✨ Features
- Wallet connection (MetaMask)
- Property listing from mock API
- Rent transaction simulation
- Dark/Light mode (Tailwind + Redux)
- Multi-chain ready structure (Ethereum, Polygon, BSC)
- Fully deployable on **Vercel**

### 🧩 Tech Stack
Next.js · TypeScript · Redux Toolkit · RTK Query · Ethers.js · TailwindCSS · Framer Motion

### 🚀 Getting Started
```bash
npm install
npm run dev
```

### 🧠 Author
**Chris Du**  
Senior Software Engineer  
[GitHub](https://github.com/campustudio)
