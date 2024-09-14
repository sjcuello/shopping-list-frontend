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
    updateItem: (state, action) => { 
      const itemToUpdate = state.itemList.find((item) => item.id === action.payload.id);
      if (itemToUpdate) {
        itemToUpdate.name = action.payload.name;
        itemToUpdate.description = action.payload.description;
        itemToUpdate.amount = action.payload.amount;
        itemToUpdate.isChecked = action.payload.isChecked;
      }
    },
    deleteItem: (state, action) => { 
      const itemToDelete = state.itemList.find((item) => item.id === action.payload);
      if (itemToDelete) {
        state.deletedList.push(itemToDelete);
        state.itemList = state.itemList.filter((item) => item.id !== action.payload);
      }
    },
    restoreItem: (state, action) => { 
      const itemToRestore = state.deletedList.find((item) => item.id === action.payload);
      if (itemToRestore) {
        state.itemList.push(itemToRestore);
        state.deletedList = state.deletedList.filter((item) => item.id !== action.payload);
      }
    },
    checkItem: (state, action) => { 
      const itemToCheck = state.itemList.find((item) => item.id === action.payload);
      if (itemToCheck) {
        itemToCheck.isChecked = !itemToCheck.isChecked;
      }
    }
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



export default itemsSlice.reducer;
