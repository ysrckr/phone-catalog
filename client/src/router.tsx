import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { HomePage } from './pages/Home';
import { PhonesPage } from './pages/Phones';
import { TabletsPage } from './pages/Tablets';
import { AccessoriesPage } from './pages/Accessories/';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/phones',
        element: <PhonesPage />,
        children: [
          {
            path: '/phones',
            element: <PhonesPage />,
          },
          {
            path: '/phones/:id',
            element: <PhonesPage />,
          }
        ],
      },
      {
        path: '/tablets',
        element: <TabletsPage />,
      },
      {
        path: '/accessories',
        element: <AccessoriesPage />,
      },
      {
        path: '/favorites',
        element: <HomePage />,
      },
      {
        path: '/cart',
        element: <HomePage />,
      }
    ],
  },
]);
