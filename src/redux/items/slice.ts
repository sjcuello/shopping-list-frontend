import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ItemsState } from '../../interfaces';
import thunk from './thunk';

const initialState: ItemsState = {
  data: [],
  status: 'idle',
  error: null
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItemList: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunk.fetchAllItems.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.fetchAllItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(thunk.fetchAllItems.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(thunk.addItem.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.addItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(thunk.addItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.data = state.data.filter((item) => item.id !== (action.payload as { id: number }).id);
      })
      .addCase(thunk.editItem.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.editItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(thunk.editItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to edit item';
      })
      .addCase(thunk.removeItem.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.removeItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(thunk.removeItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to remove item';
      })
  },
});

export const {
  setItemList,
} = itemsSlice.actions;

export const selectItemList = (state: RootState) => state.items;
export const selectItemById = (state: RootState, id: number) => state.items.data.find((item) => item.id === id);
export const selectAllNames = (state: RootState) => state.items.data.map((item) => item.name);



export default itemsSlice.reducer;
