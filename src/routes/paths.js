// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_DASHBOARD = '/bang-dieu-khien'

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  courses: '/khoa-hoc',
  profile: '/trang-ca-nhan',
  webDev: '/khoa-hoc/danh-muc/lap-trinh-web',
  mobileDev: '/khoa-hoc/danh-muc/lap-trinh-mobile',
  gameDev: '/khoa-hoc/danh-muc/lap-trinh-game',
  applicationDev: '/khoa-hoc/danh-muc/lap-trinh-ung-dung',
  AI: '/khoa-hoc/danh-muc/machine-learning-ai',
  embeddedDev: '/khoa-hoc/danh-muc/lap-trinh-nhung',
  automationTest: '/khoa-hoc/danh-muc/automation-test',
  basicDev: '/khoa-hoc/danh-muc/lap-trinh-co-ban',
  advancedDev: '/khoa-hoc/danh-muc/lap-trinh-nang-cao',
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
  },
  students: {
    root: path(ROOTS_DASHBOARD, '/students'),
    studentList: path(ROOTS_DASHBOARD, '/students/student-list'),
    newStudent: path(ROOTS_DASHBOARD, '/students/new-student'),
  },
  courses: {
    root: path(ROOTS_DASHBOARD, '/courses'),
    courseList: path(ROOTS_DASHBOARD, '/courses/course-list'),
    newCourse: path(ROOTS_DASHBOARD, '/courses/new-course'),
    courseManage: path(ROOTS_DASHBOARD, '/courses/manage'),
  },
  categories: {
    root: path(ROOTS_DASHBOARD, '/categories'),
    categoryList: path(ROOTS_DASHBOARD, '/categories/category-list'),
    newCategory: path(ROOTS_DASHBOARD, '/categories/new-category'),
  },
}
