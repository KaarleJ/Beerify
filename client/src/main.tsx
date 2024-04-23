import './index.css';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingView from './views/LandingView.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import ReviewsView from './views/ReviewsView.tsx';
import CreateView from './views/CreateView.tsx';
import EditView from './views/EditView.tsx';
import Error from './views/ErrorView.tsx';
import LoginView from './views/LoginView.tsx';
import RegisterView from './views/RegisterView.tsx';
import AuthProvider from './components/AuthProvider.tsx';
import ReviewView from './views/ReviewView.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingView />,
    errorElement: <Error />,
  },
  {
    path: '/reviews',
    element: <ReviewsView />,
  },
  {
    path: '/create',
    element: <CreateView />,
  },
  {
    path: '/edit/:id',
    element: <EditView />,
  },
  {
    path: '/login',
    element: <LoginView />,
  },
  {
    path: '/register',
    element: <RegisterView />,
  },
  {
    path:'/reviews/:id',
    element: <ReviewView />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
