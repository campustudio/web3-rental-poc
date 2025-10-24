import { createSlice } from '@reduxjs/toolkit';

const propertySlice = createSlice({
  name: 'properties',
  initialState: { rentedIds: [] as string[] },
  reducers: {
    setRentedIds: (state, action) => {
      state.rentedIds = Array.isArray(action.payload) ? action.payload : [];
    },
    addRentedId: (state, action) => {
      const id: string = action.payload;
      if (!state.rentedIds.includes(id)) state.rentedIds.push(id);
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('rentedIds', JSON.stringify(state.rentedIds)); } catch {}
      }
    },
    removeRentedId: (state, action) => {
      const id: string = action.payload;
      state.rentedIds = state.rentedIds.filter((x) => x !== id);
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('rentedIds', JSON.stringify(state.rentedIds)); } catch {}
      }
    },
  },
});
export const { setRentedIds, addRentedId, removeRentedId } = propertySlice.actions;
export default propertySlice.reducer;
