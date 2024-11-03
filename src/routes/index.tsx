import { createBrowserRouter, Navigate, Route, RouteObject, RouterProvider, Routes } from 'react-router-dom';
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
import ProjectManagementPage from '../pages/ProjectManagementPage';
import TaskManagement from '../pages/TaskManagement';
import Timeline from '../pages/Timeline';
import CalendarMentor from '../pages/CalendarMentor';
import FinancialReport from '../pages/FinancialReport';
import ProjectDetail from '../pages/ProjectDetail';
import SideBarLayout from '../layouts/SideBarLayout';
import Manager_Project_Layout from '../pages/Manager_Project';
import Manager_Event_Layout from '../pages/Manager_Event';
import Manager_Approval_Layout from '../pages/Manager_Approval';
import ProfileInformation from '../pages/ProfilePage/component/ProfileInformation';
import EditProfile from '../pages/ProfilePage/component/EditProfile';

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
    element: <MyProjectPage/>,
  },
  {
    path: path.login,
    element: <Login/>,
  },
  {
    path: path.register,
    element: <Register/>,
  },
  {
    path: path.profile,
    element: <ProfilePage/>,
    children: [
      {
        element: <ProfileInformation/>,
        index: true,
      },
      {
        element: <EditProfile/>,
        path: path.Profile_edit
      }
    ]
  }
  ,
  {
    path: path.projectManagement,
    element: <ProjectManagementPage/>,
    children: [
      {
        element: <TaskManagement/>,
        index: true,
      },
      {
        element: <Timeline/>,
        path: path.timeLine
      },
      {
        element: <CalendarMentor/>,
        path: path.calendarMentor
      },
      {
        element: <FinancialReport/>,
        path: path.financialReport
      },
      {
        element: <ProjectDetail/>,
        path: path.projectDetail
      }
    ]
  },
  {
    path: path.manager_project_management,
    element: <SideBarLayout/>,
    children: [
      {
        element: <Manager_Project_Layout/>,
        index: true,
      },
      {
        element: <Manager_Event_Layout/>,
        path: path.manager_event_management
      },
      {
        element: <Manager_Approval_Layout/>,
        path: path.manager_approval_management
      }
    ]
  }
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
