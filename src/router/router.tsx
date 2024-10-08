import Transactions from '../pages/Transactions.tsx';
import Home from '../pages/Home.tsx';
import Categories from '../pages/Categories.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import Auth from '../pages/Auth.tsx';
import Layout from '../pages/Layout.tsx';
import ProtectedRoute from '../components/ProtectedRoute.tsx';
import { createBrowserRouter } from 'react-router-dom';
import {
  categoriesAction,
  categoriesLoader,
} from '../actions/categoriesActions.ts';
import {
  transactionsLoader,
  transactionsAction,
} from '../actions/transactionsActions.ts';
import { homeLoader } from '../actions/homeActions.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: 'categories',
        action: categoriesAction,
        loader: categoriesLoader,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: 'transactions',
        loader: transactionsLoader,
        action: transactionsAction,
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
      { path: 'auth', element: <Auth /> },
    ],
  },
]);
