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
    getDefaultMiddleware().concat(walletApi.middleware).concat(propertyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
