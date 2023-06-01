//modules
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//css
import 'tailwindcss/tailwind.css';

//components
import RootLayout from './components/RootLayout';

//pages
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import PagePanden from './pages/PagePanden';
import PagePandDetail from './pages/PagePandDetail';
import PagePandEdit from './pages/PagePandEdit';
import PagePandCreate from './pages/PagePandCreate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'panden',
        children: [
          {
            index: true,
            element: <PagePanden />,
          },
          {
            path: ':id',
            id: 'panden-detail',
            children: [
              {
                index: true,
                element: <PagePandDetail />,
              },
              {
                path: 'edit',
                element: <PagePandEdit />,
              },
            ],
          },
          {
            path: 'new',
            element: <PagePandCreate />,
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ]
  }
]);

const App = props => {
  return <RouterProvider router={router} />;
};

export default App;
