// redux/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addAutoComma, removeComma } from "../common/Util.tsx";

const counterSlice = createSlice({
  name: "purchase",
  initialState: "0", // [] {}
  reducers: {
    addPurchase: {
      reducer: (state, action) => {
        return action.payload.inputValue;
        // state.value = action.payload.text;
      },
      prepare: (text) => {
        const inputValue = addAutoComma(removeComma(text).replace(/^0+/, ""));
        return { payload: { inputValue } };
      },
    },
    plusPurchase: {
      reducer: (action) => {
        const inputValue = parseInt(removeComma(action)) + 50;
        return addAutoComma(inputValue.toString());
      },
    },
    minusPurchase: {
      reducer: (action) => {
        const inputValue = parseInt(removeComma(action)) - 50;
        return addAutoComma(inputValue.toString());
      },
    },
  },
});

export const { addPurchase, plusPurchase, minusPurchase } =
  counterSlice.actions;
export default counterSlice.reducer;
