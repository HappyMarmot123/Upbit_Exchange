// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import purchaseReducer from "./redux/counterSlice";

const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type ReplaceReducer = typeof store.replaceReducer;

export default store;
