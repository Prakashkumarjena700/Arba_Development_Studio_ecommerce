import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isRegister: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  msg: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.msg = action.payload.msg
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state) {
      state.loading = false;
      state.isRegister = true;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.isRegister = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
