import { createSlice } from '@reduxjs/toolkit';
import { storeAccessToken, storeRefreshToken } from '../../utils/auth';

type TUserAuth = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type TAuthSlice = {
  user: TUserAuth | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type TRootState = { auth: TAuthSlice };

const initialState: TAuthSlice = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      storeAccessToken(accessToken);
      storeRefreshToken(refreshToken);
    },
    logout: (state, _action) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: TRootState) => state.auth.user;
export const selectCurrentAccessToken = (state: TRootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: TRootState) => state.auth.refreshToken;
