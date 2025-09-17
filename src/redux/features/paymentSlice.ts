import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  courseId: string | null;
  
  paypalOrderId: string | null;
  sessionId: string | null;
}

const initialState: PaymentState = {
  courseId: null,
  paypalOrderId: null,
  sessionId: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // Reducer to set or update the payment state
    setPaymentState: (state, action: PayloadAction<Partial<PaymentState>>) => {
      return { ...state, ...action.payload };
    },
    // Reducer to reset the payment state to its initial values
    resetPaymentState: () => initialState,
  },
});

export const { setPaymentState, resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
