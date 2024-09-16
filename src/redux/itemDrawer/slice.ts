import { createSlice } from '@reduxjs/toolkit';
import { ItemForm } from '../../interfaces';

const initialState: ItemForm = {
  name: '',
  description: '',
  amount: 0
}

export const itemDrawerSlice = createSlice({
  name: 'itemDrawer',
  initialState,
  reducers: {
    setFullItem: (state, action) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.amount = action.payload.amount
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setClear: () => initialState,
  },
});

export const {
  setName,
  setDescription,
  setAmount,
  setFullItem,
  setClear
} = itemDrawerSlice.actions;

export const selectItemDrawer = (state: { itemDrawer: ItemForm; }) => state.itemDrawer;


export default itemDrawerSlice.reducer;
