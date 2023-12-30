/* eslint-disable no-console */
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }: any) => {
    const { accessToken, refreshToken } = getState().auth;

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
      headers.set('x-refresh', refreshToken);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result as FetchBaseQueryError).status === 401 ||
    (result as any).headers?.get('x-access-token') // Check for new access token in response header
  ) {
    console.log('New access token received in response header');
    const newAccessToken = (result as any).headers.get('x-access-token');

    // Store the new access token in redux state
    api.dispatch(setCredentials({ accessToken: newAccessToken }));

    // Retry the original query with the new access token
    result = await baseQuery(args, api, extraOptions);
  } else {
    // Handle other errors (not 401 or new access token)
    console.log('Handling other errors');
    if ((result as FetchBaseQueryError).status === 403) {
      console.log('Unauthorized: access forbidden');
      api.dispatch(logout({}));
    } else {
      console.log('Unexpected error:', result);
      // Handle other error scenarios as needed
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (_builder) => ({}),
});
