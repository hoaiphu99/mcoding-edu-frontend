// routes
import { PATH_DASHBOARD } from '../../routes/paths'
// components
import SvgIconStyle from '../../components/SvgIconStyle'

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
)

const ICONS = {
  user: getIcon('ic_user'),
  student: getIcon('ic_user_groups'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  categories: getIcon('ic_categories'),
}

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'chung',
    items: [
      { title: 'bảng điều khiển', path: PATH_DASHBOARD.general.generalAnalytics, icon: ICONS.dashboard },
      { title: 'thống kê', path: PATH_DASHBOARD.general.chartAnalytics, icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Quản lý',
    items: [
      {
        title: 'người dùng',
        path: PATH_DASHBOARD.users.root,
        icon: ICONS.user,
        children: [
          { title: 'tất cả', path: PATH_DASHBOARD.users.userList },
          // { title: 'thêm mới', path: PATH_DASHBOARD.users.newUser },
        ],
      },
      {
        title: 'học viên',
        path: PATH_DASHBOARD.students.root,
        icon: ICONS.student,
        children: [{ title: 'tất cả', path: PATH_DASHBOARD.students.studentList }],
      },
      {
        title: 'khóa học',
        path: PATH_DASHBOARD.courses.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'tất cả', path: PATH_DASHBOARD.courses.courseList },
          { title: 'thêm mới', path: PATH_DASHBOARD.courses.newCourse },
        ],
      },
      {
        title: 'Danh mục',
        path: PATH_DASHBOARD.categories.root,
        icon: ICONS.categories,
        children: [{ title: 'tất cả', path: PATH_DASHBOARD.categories.categoryList }],
      },
    ],
  },
]

export default sidebarConfig
