import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Card, ItemsState } from '../../interfaces';

const defaultState: ItemsState = {
  data: [],
  status: 'idle',
  error: null
}

interface ItemsData {
  itemList: ItemsState
  deletedList: ItemsState;
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('http://localhost:3000/item');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  console.log('response :>> ', response);
  return response.json(); // Assumes the response is JSON
})

const initialState: ItemsData = {
  itemList: defaultState,
  deletedList: defaultState
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
    addItem: (state, action) => {
      const itemForm = action.payload;
      const newItem: Card = { ...itemForm, id: state.itemList.data.length + 1, isChecked: false };
      state.itemList.data.push(newItem);
    },
    updateItem: (state, action) => {
      const itemToUpdate = state.itemList.data.find((item) => item.id === action.payload.id);
      if (itemToUpdate) {
        itemToUpdate.name = action.payload.name;
        itemToUpdate.description = action.payload.description;
        itemToUpdate.amount = action.payload.amount;
        itemToUpdate.isChecked = action.payload.isChecked;
      }
    },
    deleteItem: (state, action) => {
      const itemToDelete = state.itemList.data.find((item) => item.id === action.payload);
      if (itemToDelete) {
        state.deletedList.data.push(itemToDelete);
        state.itemList.data = state.itemList.data.filter((item) => item.id !== action.payload);
      }
    },
    restoreItem: (state, action) => {
      const itemToRestore = state.deletedList.data.find((item) => item.id === action.payload);
      if (itemToRestore) {
        state.itemList.data.push(itemToRestore);
        state.deletedList.data = state.deletedList.data.filter((item) => item.id !== action.payload);
      }
    },
    checkItem: (state, action) => {
      const itemToCheck = state.itemList.data.find((item) => item.id === action.payload);
      if (itemToCheck) {
        itemToCheck.isChecked = !itemToCheck.isChecked;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.itemList.status = 'pending';
        state.deletedList.status = 'pending';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.itemList.status = 'succeeded';
        state.deletedList.status = 'succeeded';
        state.itemList.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.itemList.status = 'rejected';
        state.deletedList.status = 'rejected';
        state.itemList.error = action.error.message || 'Failed to fetch data';
        state.itemList.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const {
  setItemList,
  setDeletedList,
  addItem,
  updateItem,
  deleteItem,
  restoreItem,
  checkItem
} = itemsSlice.actions;

export const selectItemList = (state: RootState) => state.items.itemList;
export const selectDeletedList = (state: RootState) => state.items.deletedList;
export const selectItemById = (state: RootState, id: number) => state.items.itemList.data.find((item) => item.id === id);
export const selectDeletedItemById = (state: RootState, id: number) => state.items.deletedList.data.find((item) => item.id === id);



export default itemsSlice.reducer;
