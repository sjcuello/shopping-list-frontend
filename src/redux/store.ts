import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items';
import itemDrawerReducer from './itemDrawer';
import drawerReducer from './drawer';
import itemSelectedReducer from './itemSelected';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemDrawer: itemDrawerReducer,
  drawer: drawerReducer,
  itemSelected: itemSelectedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
