// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_DASHBOARD = '/dashboard'

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  courses: '/khoa-hoc',
  courseDetails: '/khoa-hoc/:slug',
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    pageTwo: path(ROOTS_DASHBOARD, '/two'),
    pageThree: path(ROOTS_DASHBOARD, '/three'),
  },
  users: {
    root: path(ROOTS_DASHBOARD, '/users'),
    userList: path(ROOTS_DASHBOARD, '/users/user-list'),
    newUser: path(ROOTS_DASHBOARD, '/users/new-user'),
    pageFive: path(ROOTS_DASHBOARD, '/users/five'),
    pageSix: path(ROOTS_DASHBOARD, '/users/six'),
  },
  courses: {
    root: path(ROOTS_DASHBOARD, '/courses'),
    courseList: path(ROOTS_DASHBOARD, '/courses/course-list'),
    newCourse: path(ROOTS_DASHBOARD, '/courses/new-course'),
  },
}
