import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: (typeof window !== 'undefined' && localStorage.getItem('theme')) || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload === 'dark' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        document.documentElement.dataset.theme = state.theme;
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        document.documentElement.dataset.theme = state.theme;
      }
    },
  },
});
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
