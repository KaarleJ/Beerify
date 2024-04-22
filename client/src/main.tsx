import './index.css';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './views/Landing.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import Reviews from './views/Reviews.tsx';
import Create from './views/Create.tsx';
import Edit from './views/Edit.tsx';
import Error from './views/Error.tsx';
import AuthProvider from './components/AuthProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/reviews',
    element: <Reviews />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: 'edit',
    element: <Edit />,
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
