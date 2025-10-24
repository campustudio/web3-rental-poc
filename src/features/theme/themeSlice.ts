import { createSlice } from '@reduxjs/toolkit';
import { setItem } from '@/lib/storage';

const initialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload === 'dark' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        try { setItem('theme', state.theme); } catch {}
        document.documentElement.dataset.theme = state.theme;
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        try { setItem('theme', state.theme); } catch {}
        document.documentElement.dataset.theme = state.theme;
      }
    },
  },
});
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
