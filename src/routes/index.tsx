import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import EventPage from '../pages/EventPage';
import path from '../constant/path';
import ProjectPage from '../pages/ProjectPage';
import EventDetailPage from '../pages/EventDetailPage';
import CreateProjectPage from '../pages/CreateProjectPage';
import MyProjectPage from '../pages/MyProjectPage';
import Register from '../pages/Register';
import ProfilePage from '../pages/ProfilePage';
import SideBarLayout from '../layouts/SideBarLayout';
import Manager_Project_Layout from '../pages/Manager_Project';
import Manager_Event_Layout from '../pages/Manager_Event';
import Manager_Approval_Layout from '../pages/Manager_Approval';
import ProfileInformation from '../pages/ProfilePage/component/ProfileInformation';
import SideBarAdmin from '../layouts/SideBarAdmin';
import Admin_account_management from '../pages/Admin_account_management';
import Admin_dashboard from '../pages/Admin_dashboard';
import ProjectOverview from '../pages/ProjectOverview';
import ProjectManagementPage from '../pages/ProjectManagementPage';
import ProjectDetail from '../pages/ProjectDetail';

const publicRoutes: RouteObject[] = [
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
  },
  {
    path: path.createProject,
    element: <CreateProjectPage />,
  },
  {
    path: path.myProject,
    element: <MyProjectPage />,
  },
  {
    path: path.login,
    element: <Login />,
  },
  {
    path: path.register,
    element: <Register />,
  },
  {
    element: <ProjectDetail />,
    path: path.projectDetail,
    children: [
      {
        element: <ProjectOverview />,
        index: true,
      },
    ],
  },
  {
    path: path.projectManagement,
    element: <ProjectManagementPage />,
    // children: [
    //   {
    //     element: <TaskManagement />,
    //     index: true,
    //   },
    //   {
    //     element: <Timeline />,
    //     path: path.timeLine,
    //   },
    //   {
    //     element: <CalendarMentor />,
    //     path: path.calendarMentor,
    //   },
    //   {
    //     element: <FinancialReport />,
    //     path: path.financialReport,
    //   },
    //   {
    //     element: <ProjectDetail />,
    //     path: path.projectDetail,
    //   },
    // ],
  },
  {
    path: path.manager_project_management,
    element: <SideBarLayout />,
    children: [
      {
        element: <Manager_Project_Layout />,
        index: true,
      },
      {
        element: <Manager_Event_Layout />,
        path: path.manager_event_management,
      },
      {
        element: <Manager_Approval_Layout />,
        path: path.manager_approval_management,
      },
    ],
  },
  {
    path: path.profile,
    element: <ProfilePage />,
    children: [
      {
        element: <ProfileInformation />,
        index: true,
      },
    ],
  },
  {
    path: path.admin_account_management,
    element: <SideBarAdmin />,
    children: [
      {
        element: <Admin_account_management />,
        index: true,
      },
      {
        element: <Admin_dashboard />,
        path: path.admin_dashboard,
      },
    ],
  },
];

// const authenticatedRoutes: RouteType[] = [];

const unauthenticatedRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const AppRouter = (): React.ReactElement => {
  // const { token } = useAuth();

  const router = createBrowserRouter([
    ...publicRoutes,
    ...unauthenticatedRoutes,
    // ...(token ? authenticatedRoutes : unauthenticatedRoutes),
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
