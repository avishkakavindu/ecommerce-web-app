import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentAccessToken } from './authSlice';

export default function RequireAuth() {
  const accessToken = useSelector(selectCurrentAccessToken);
  const location = useLocation();

  return accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
