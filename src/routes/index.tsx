import { Navigate, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import EventPage from '../pages/EventPage';
import path from '../constant/path';
import ProjectPage from '../pages/ProjectPage';
import EventDetailPage from '../pages/EventDetailPage';

interface RouteType {
  path: string;
  element: JSX.Element;
  children?: RouteType[];
}

const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: path.newFeed,
    element: <EventPage />,
  },
  {
    path: path.project,
    element: <ProjectPage />,
  },
  {
    path: path.newsDetail,
    element: <EventDetailPage />,
  }
];

// const authenticatedRoutes: RouteType[] = [];

const unauthenticatedRoutes: RouteType[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const Router = (): JSX.Element => {
  // const { token } = useAuth();

  const router = [
    ...publicRoutes,
    ...unauthenticatedRoutes,
    // ...(token ? authenticatedRoutes : unauthenticatedRoutes),
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ];

  return (
    <Routes>
      {router.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
