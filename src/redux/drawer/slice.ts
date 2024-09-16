

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setDrawer: (state, action) => {
      state.isOpen = action.payload;
    },
    switchDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    setClear: () => initialState,
  },
});

export const {
  setDrawer,
  setClear,
  switchDrawer
} = drawerSlice.actions;

export const selectDrawer = (state: { drawer: { isOpen: boolean; }; }) => state.drawer.isOpen;


export default drawerSlice.reducer;
