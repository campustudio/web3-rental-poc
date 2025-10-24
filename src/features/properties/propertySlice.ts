import { createSlice } from '@reduxjs/toolkit';

const propertySlice = createSlice({
  name: 'properties',
  initialState: { rentedIds: [] as string[] },
  reducers: {
    addRentedId: (state, action) => {
      const id: string = action.payload;
      if (!state.rentedIds.includes(id)) state.rentedIds.push(id);
    },
    removeRentedId: (state, action) => {
      const id: string = action.payload;
      state.rentedIds = state.rentedIds.filter((x) => x !== id);
    },
  },
});
export const { addRentedId, removeRentedId } = propertySlice.actions;
export default propertySlice.reducer;
