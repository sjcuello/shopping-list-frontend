import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ItemsState } from '../../interfaces';
import thunk from './thunk';

const defaultState: ItemsState = {
  data: [],
  status: 'idle',
  error: null
}

interface ItemsData {
  itemList: ItemsState
  deletedList: ItemsState;
}

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
      .addCase(thunk.fetchAllItems.pending, (state) => {
        state.itemList.status = 'pending';
        state.deletedList.status = 'pending';
      })
      .addCase(thunk.fetchAllItems.fulfilled, (state, action) => {
        state.itemList.status = 'succeeded';
        state.deletedList.status = 'succeeded';
        state.itemList.data = action.payload;
      })
      .addCase(thunk.fetchAllItems.rejected, (state, action) => {
        state.itemList.status = 'rejected';
        state.deletedList.status = 'rejected';
        state.itemList.error = action.error.message || 'Failed to fetch data';
        state.itemList.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(thunk.addItem.pending, (state) => {
        state.itemList.status = 'pending';
      })
      .addCase(thunk.addItem.fulfilled, (state, action) => {
        state.itemList.status = 'succeeded';
        state.itemList.data.push(action.payload);
      })
      .addCase(thunk.addItem.rejected, (state, action) => {
        state.itemList.status = 'rejected';
        state.itemList.data = state.itemList.data.filter((item) => item.id !== (action.payload as { id: number }).id);
      })
      .addCase(thunk.editItem.pending, (state) => {
        state.itemList.status = 'pending';
      })
      .addCase(thunk.editItem.fulfilled, (state, action) => {
        state.itemList.status = 'succeeded';
        state.itemList.data = state.itemList.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(thunk.editItem.rejected, (state, action) => {
        state.itemList.status = 'rejected';
        state.itemList.error = action.error.message || 'Failed to edit item';
      })
      .addCase(thunk.removeItem.pending, (state) => {
        state.itemList.status = 'pending';
      })
      .addCase(thunk.removeItem.fulfilled, (state, action) => {
        state.itemList.status = 'succeeded';
        state.itemList.data = state.itemList.data.filter((item) => item.id !== action.payload);
      })
      .addCase(thunk.removeItem.rejected, (state, action) => {
        state.itemList.status = 'rejected';
        state.itemList.error = action.error.message || 'Failed to remove item';
      })
  },
});

export const {
  setItemList,
  setDeletedList,
  deleteItem,
  restoreItem,
  checkItem
} = itemsSlice.actions;

export const selectItemList = (state: RootState) => state.items.itemList;
export const selectDeletedList = (state: RootState) => state.items.deletedList;
export const selectItemById = (state: RootState, id: number) => state.items.itemList.data.find((item) => item.id === id);
export const selectDeletedItemById = (state: RootState, id: number) => state.items.deletedList.data.find((item) => item.id === id);



export default itemsSlice.reducer;
