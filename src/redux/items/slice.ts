import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Card } from '../../interfaces';

interface ItemsData {
  itemList: Card[];
  deletedList: Card[];
}

const initialState: ItemsData = {
  itemList: [{
    id: 0,
    name: 'Prueba',
    description: 'Descripcion de prueba',
    amount: 0,
    isChecked: false,
  }],
  deletedList: []
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItemList: (state, action) => {
      state.itemList = action.payload;
    },
    setDeletedList: (state, action) => {
      state.deletedList = action.payload;
    },
  },
});

export const {
  setItemList,
  setDeletedList,
} = itemsSlice.actions;

export const selectItemList = (state: RootState) => state.items.itemList;
export const selectDeletedList = (state: RootState) => state.items.deletedList;
export const selectItemById = (state: RootState, id: number) => state.items.itemList.find((item) => item.id === id);
export const selectDeletedItemById = (state: RootState, id: number) => state.items.deletedList.find((item) => item.id === id);
export const deleteItemById = (state: RootState, id: number) => { 
  const itemToDelete = state.items.itemList.find((item) => item.id === id);
  if (itemToDelete) {
    state.items.deletedList.push(itemToDelete);
    state.items.itemList = state.items.itemList.filter((item) => item.id !== id);
  }
}
export const restoreItemById = (state: RootState, id: number) => { 
  const itemToRestore = state.items.deletedList.find((item) => item.id === id);
  if (itemToRestore) {
    state.items.itemList.push(itemToRestore);
    state.items.deletedList = state.items.deletedList.filter((item) => item.id !== id);
  }
}



export default itemsSlice.reducer;
