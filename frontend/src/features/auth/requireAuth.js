import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequireAuth() {
  const accessToken = useSelector((state) => state.auth.user);
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}
