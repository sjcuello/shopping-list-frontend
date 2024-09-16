import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../../interfaces';

const initialState: Card = {
  name: '',
  description: '',
  amount: 0,
  id: 0,
  isChecked: false,
  markAsDeleted: false
}

export const itemSelectedSlice = createSlice({
  name: 'itemSelected',
  initialState,
  reducers: {
    setItemSelected: (state, action) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.amount = action.payload.amount;
      state.id = action.payload.id;
      state.isChecked = action.payload.isChecked;
      state.markAsDeleted = action.payload.markAsDeleted;
    },
    setClear: () => initialState,
  },
});

export const {
  setItemSelected,
  setClear
} = itemSelectedSlice.actions;

export const selectItemSelected = (state: { itemSelected: Card; }) => state.itemSelected;
export const isItemSelectedEmpty = (state: { itemSelected: Card; }) => {
  return state.itemSelected.id === 0;
}

export default itemSelectedSlice.reducer;
