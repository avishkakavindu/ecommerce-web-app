import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './features/Login';
import Dashboard from './features/Dashboard';
import RequireAuth from './features/auth/RequireAuth';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
