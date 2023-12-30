import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser, selectCurrentAccessToken } from './auth/authSlice';

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectCurrentAccessToken);

  const msg = user ? `welcome ${user}` : 'welcome';
  return (
    <div>
      <h1>{msg}</h1>
      <p>{user?.email}</p>
      <p>{accessToken}</p>
    </div>
  );
}
