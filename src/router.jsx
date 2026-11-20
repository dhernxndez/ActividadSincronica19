import { createBrowserRouter } from 'react-router';
import AppLayout from './layout/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'productos', element: <ProductsPage /> },
        { path: 'productos/:id', element: <ProductDetailPage /> },
        { path: 'carrito', element: <CartPage /> },
        { path: '*', element: <NotFoundPage /> }
      ]
    }
  ],
  { basename: base || '/' }
);
