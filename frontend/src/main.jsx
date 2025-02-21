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
import AuthProvider from './contexts/AuthProvider';
import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import Data from './contexts/Data';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Data>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route
                path="profile"
                element={
                  <PrivateRoutes>
                    <Profile />
                  </PrivateRoutes>
                }
              />
              <Route
                path="tasks"
                element={
                  <PrivateRoutes>
                    <Tasks />
                  </PrivateRoutes>
                }
              />
            </Route>
            <Route element={<AuthLayout />}>
              <Route
                path="auth/login"
                element={
                  <PublicRoutes>
                    <Login />
                  </PublicRoutes>
                }
              />
              <Route
                path="auth/register"
                element={
                  <PublicRoutes>
                    <Register />
                  </PublicRoutes>
                }
              />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Data>
    </AuthProvider>
  </StrictMode>,
);
