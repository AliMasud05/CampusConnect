import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "@/redux/features/authSlice";
import coursesTabReducer from "@/redux/features/coursesTabSlice";
import paymentReducer from "./paymentSlice";
import amountReducer from "./amountSlice";
import couponReducer from "./couponSlice";


const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  coursesTab: coursesTabReducer,
  payment:paymentReducer,
  amount: amountReducer,
  coupon: couponReducer,
});

export default rootReducer;
