// redux/features/coursesTabSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabState = {
  activeTab: "all" | "upcoming";
};

const initialState: TabState = {
  activeTab: "all",
};

const coursesTabSlice = createSlice({
  name: "coursesTab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<"all" | "upcoming">) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = coursesTabSlice.actions;
export default coursesTabSlice.reducer;
