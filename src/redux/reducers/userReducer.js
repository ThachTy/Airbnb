import { createReducer, createAction } from "@reduxjs/toolkit";

export const userAction = createAction("user/action");

const initialState = {
  user: {},
  stateUser: { isLogin: false },
};

const userReducer = createReducer(initialState, (build) => {
  build.addCase(userAction, (state, { payload }) => {
    let { user, stateUser } = payload;
    state.user = user;
    state.stateUser = stateUser;
  });
});

export default userReducer;
