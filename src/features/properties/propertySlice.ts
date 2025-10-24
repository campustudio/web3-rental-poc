import { createSlice } from '@reduxjs/toolkit';

const propertySlice = createSlice({
  name: 'properties',
  initialState: { lastRentId: null as null | string },
  reducers: {
    setLastRentId: (state, action) => {
      state.lastRentId = action.payload;
    },
  },
});
export const { setLastRentId } = propertySlice.actions;
export default propertySlice.reducer;
