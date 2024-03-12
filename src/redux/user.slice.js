import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: null,
    state: { isLogin: false },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginAction } = userSlice.actions;
export default userSlice.reducer;
