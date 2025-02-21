import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
