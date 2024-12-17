import {
  createBrowserRouter,
  Navigate,
  Outlet,
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
import { useContext } from 'react';
import { AppContext } from '../context/app.context';
import TaskManagement from '../pages/TaskManagement';
import ProjectTaskDetail from '../pages/ProjectTaskDetail';
import Mentor_Schedule_Layout from '../pages/Mentor_Schedule';
import FinancialReport from '../pages/FinancialReport';
import CalendarMentor from '../pages/CalendarMentor';
import CalendarLecturer from '../pages/CalendarLecturer';
<<<<<<< HEAD
=======
import Inbox from '../pages/Inbox/Inbox';
>>>>>>> 76c812b (fix merge)

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
  const { isAuthenticated, profile } = useContext(AppContext);
  console.log(isAuthenticated);
  console.log(profile);

  return !isAuthenticated ? (
    <Outlet />
  ) : profile?.role == 1 ? (
    <Navigate to={path.all_management} />
  ) : (
    <Navigate to={path.home} />
  );
}

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Homepage />,
  },
];

const authenticatedRoutes: RouteObject[] = [
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
    path: path.projectManagement,
    element: <ProjectManagementPage />,
  },
  {
<<<<<<< HEAD
=======
    path: path.inbox,
    element: <Inbox />,
  },
  {
>>>>>>> 76c812b (fix merge)
    element: <ProjectDetail />,
    path: path.projectDetail,
    children: [
      {
        element: <ProjectOverview />,
        index: true,
      },
      {
        element: (
          <>
            <Outlet />
          </>
        ),
        path: path.taskManagement,
        children: [
          {
            element: <TaskManagement />,
            index: true,
          },
          {
            element: <ProjectTaskDetail />,
            path: path.projectTaskDetail,
          },
        ],
      },
      {
        element: <FinancialReport />,
        path: path.financialReport,
      },
      {
        element: <CalendarMentor />,
        path: path.calendarMentor,
      },
      {
        element: <CalendarLecturer />,
        path: path.calendarLecturer,
      },
    ],
  },
  {
    path: path.all_management,
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
    path: path.all_management,
    element: <SideBarLayout />,
    children: [
      {
        element: <Manager_Project_Layout />,
        index: true,
      },
      {
        element: <Mentor_Schedule_Layout />,
        path: path.mentor_schedule_management,
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

const protectRoute: RouteObject = {
  path: '',
  element: <ProtectedRoute />,
  children: authenticatedRoutes,
};

const unauthenticatedRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const rejectRoute: RouteObject = {
  path: '',
  element: <RejectedRoute />,
  children: unauthenticatedRoutes,
};

const AppRouter = (): React.ReactElement => {
  // const { token } = useAuth();

  const router = createBrowserRouter([
    ...publicRoutes,
    protectRoute,
    rejectRoute,
    // {
    //   path: '*',
    //   element: <Navigate to="/404" />,
    // },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
