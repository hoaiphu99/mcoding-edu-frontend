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
      path: 'bang-dieu-khien',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/bang-dieu-khien/chinh" replace /> },
        { path: 'chinh', element: <GeneralAnalytics /> },
        { path: 'bieu-do-thong-ke', element: <ChartAnalytics /> },
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
          path: 'students',
          children: [
            { element: <Navigate to="/dashboard/students/student-list" replace /> },
            {
              path: 'student-list',
              element: <StudentList />,
            },
          ],
        },
        {
          path: 'courses',
          children: [
            { element: <Navigate to="/dashboard/courses/course-list" replace /> },
            { path: 'course-list', element: <CourseList /> },
            { path: 'new-course', element: <NewCourse /> },
            { path: ':id/edit', element: <NewCourse /> },
            { path: 'manage/:slug', element: <CourseManage /> },
            { path: ':id/students', element: <CourseStudentList /> },
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
        {
          path: '/trang-ca-nhan',
          element: <Profile />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'login/teachable',
      element: <LoginTeachable />,
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
const PageThree = Loadable(lazy(() => import('../pages/PageThree')))
const UserList = Loadable(lazy(() => import('../pages/dashboard/user/UserList')))
const StudentList = Loadable(lazy(() => import('../pages/dashboard/student/StudentList')))
const PageFive = Loadable(lazy(() => import('../pages/PageFive')))
const PageSix = Loadable(lazy(() => import('../pages/PageSix')))
const NotFound = Loadable(lazy(() => import('../pages/Page404')))
const Login = Loadable(lazy(() => import('../pages/authentication/Login')))
const LoginTeachable = Loadable(lazy(() => import('../pages/authentication/LoginTeachable')))
const Register = Loadable(lazy(() => import('../pages/authentication/Register')))
const CourseList = Loadable(lazy(() => import('../pages/dashboard/course/CourseList')))
const NewCourse = Loadable(lazy(() => import('../pages/dashboard/course/CourseCreate')))
const CourseManage = Loadable(lazy(() => import('../pages/dashboard/course/CourseManage')))
const CourseStudentList = Loadable(lazy(() => import('../pages/dashboard/course/CourseStudentList')))
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')))
const ChartAnalytics = Loadable(lazy(() => import('../pages/dashboard/ChartAnalytics')))

// Page
const Courses = Loadable(lazy(() => import('../pages/Courses')))
const CourseDetails = Loadable(lazy(() => import('../pages/CourseDetails')))
const CourseLearning = Loadable(lazy(() => import('../pages/CourseLearning')))
const Profile = Loadable(lazy(() => import('../pages/Profile')))
// Main
const LandingPage = Loadable(lazy(() => import('../pages/HomePage')))
