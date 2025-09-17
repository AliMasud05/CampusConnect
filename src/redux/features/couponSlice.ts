import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoupontState {
  coupon: string;
}

const initialState: CoupontState = {
  coupon:"test"
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    // Reducer to set or update the payment state
    setCouponState: (state, action: PayloadAction<Partial<CoupontState>>) => {
      return { ...state, ...action.payload };
    },
    // Reducer to reset the payment state to its initial values
    resetCouponState: () => initialState,
  },
});

export const { setCouponState, resetCouponState } = couponSlice.actions;

export default couponSlice.reducer;
