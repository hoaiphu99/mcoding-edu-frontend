import { Suspense, lazy } from 'react'
import { Navigate, useRoutes, useLocation } from 'react-router-dom'
// layouts
import MainLayout from '../layouts/main'
import DashboardLayout from '../layouts/dashboard'
import LogoOnlyLayout from '../layouts/LogoOnlyLayout'
// components
import LoadingScreen from '../components/LoadingScreen'
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation()
  const isDashboard = pathname.includes('/dashboard')

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed',
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

export default function Router() {
  return useRoutes([
    // Dashboard Routes
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/one" replace /> },
        { path: 'one', element: <PageOne /> },
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        {
          path: 'users',
          children: [
            { element: <Navigate to="/dashboard/users/user-list" replace /> },
            { path: 'user-list', element: <UserList /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
          ],
        },
        {
          path: 'courses',
          children: [
            { element: <Navigate to="/dashboard/courses/course-list" replace /> },
            { path: 'course-list', element: <CourseList /> },
            { path: 'new-course', element: <NewCourse /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <LandingPage /> },
        {
          path: '/khoa-hoc',
          element: <Courses />,
        },
        {
          path: '/khoa-hoc/:slug',
          element: <CourseDetails />,
        },
        {
          path: '/:slug',
          element: <CourseLearning />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}

// IMPORT COMPONENTS

// Dashboard
const PageOne = Loadable(lazy(() => import('../pages/PageOne')))
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')))
const PageThree = Loadable(lazy(() => import('../pages/PageThree')))
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')))
const PageFive = Loadable(lazy(() => import('../pages/PageFive')))
const PageSix = Loadable(lazy(() => import('../pages/PageSix')))
const NotFound = Loadable(lazy(() => import('../pages/Page404')))
const Login = Loadable(lazy(() => import('../pages/Login')))
const Register = Loadable(lazy(() => import('../pages/Register')))
const Courses = Loadable(lazy(() => import('../pages/Courses')))
const CourseList = Loadable(lazy(() => import('../pages/dashboard/CourseList')))
const NewCourse = Loadable(lazy(() => import('../pages/dashboard/CourseCreate')))
const CourseDetails = Loadable(lazy(() => import('../pages/CourseDetails')))
const CourseLearning = Loadable(lazy(() => import('../pages/CourseLearning')))
// Main
const LandingPage = Loadable(lazy(() => import('../pages/HomePage')))
