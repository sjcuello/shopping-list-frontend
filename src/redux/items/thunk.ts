import { createAsyncThunk } from '@reduxjs/toolkit';
import { createItem, getItems, deleteItem, updateItem } from '../../api';
import { Card, ItemForm } from '../../interfaces';

export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => {
  const response = await getItems();
  return response;
});

export const addItem = createAsyncThunk('items/addItem', async (itemData: ItemForm) => {
  const response = await createItem(itemData);
  return response;
});

export const removeItem = createAsyncThunk('items/removeItem', async (itemId: number) => {
  const response = await deleteItem(itemId);
  return response;
});

export const editItem = createAsyncThunk('items/editItem', async (updateData: Card) => {
  const response = await updateItem(updateData);
  return response;
});

export default {
  fetchAllItems,
  addItem,
  removeItem,
  editItem
};