import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AmountState {
  amount: number;
}

const initialState: AmountState = {
  amount: 0,
};

const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    // Reducer to set or update the payment state
    setAmountState: (state, action: PayloadAction<Partial<AmountState>>) => {
      return { ...state, ...action.payload };
    },
    // Reducer to reset the payment state to its initial values
    resetAmountState: () => initialState,
  },
});

export const { setAmountState, resetAmountState } = amountSlice.actions;

export default amountSlice.reducer;
