// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_DASHBOARD = '/bang-dieu-khien'

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  courses: '/khoa-hoc',
  profile: '/trang-ca-nhan',
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    generalAnalytics: path(ROOTS_DASHBOARD, '/chinh'),
    chartAnalytics: path(ROOTS_DASHBOARD, '/bieu-do-thong-ke'),
    pageThree: path(ROOTS_DASHBOARD, '/three'),
  },
  users: {
    root: path(ROOTS_DASHBOARD, '/users'),
    userList: path(ROOTS_DASHBOARD, '/users/user-list'),
    studentList: path(ROOTS_DASHBOARD, '/users/student-list'),
    newUser: path(ROOTS_DASHBOARD, '/users/new-user'),
    pageFive: path(ROOTS_DASHBOARD, '/users/five'),
    pageSix: path(ROOTS_DASHBOARD, '/users/six'),
  },
  students: {
    root: path(ROOTS_DASHBOARD, '/students'),
    studentList: path(ROOTS_DASHBOARD, '/students/student-list'),
  },
  courses: {
    root: path(ROOTS_DASHBOARD, '/courses'),
    courseList: path(ROOTS_DASHBOARD, '/courses/course-list'),
    newCourse: path(ROOTS_DASHBOARD, '/courses/new-course'),
    courseManage: path(ROOTS_DASHBOARD, '/courses/manage'),
  },
}
