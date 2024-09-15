import { Card, ItemForm } from "../interfaces";

const BASE_URL = process.env.BASE_URL + '/item';

export const getItems = async () => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const createItem = async (itemData: ItemForm) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

export const deleteItem = async (itemId: number) => {
  const response = await fetch(`${BASE_URL}/${itemId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
  return response.json();
};

export const updateItem = async (updateData: Card) => {
  const response = await fetch(`${BASE_URL}/${updateData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error('Failed to update item');
  }
  return response.json();
};
