import { createSlice } from '@reduxjs/toolkit';
import { saveAuth, loadAuth } from '../../utils/authPersistence'

const initialState = loadAuth() || {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      saveAuth(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      saveAuth(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;