import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items';

const rootReducer = combineReducers({
  items: itemsReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
