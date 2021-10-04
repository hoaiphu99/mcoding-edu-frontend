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
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
}

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'chung',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.pageOne, icon: ICONS.dashboard },
      { title: 'Khóa học', path: PATH_DASHBOARD.general.pageTwo, icon: ICONS.ecommerce },
      { title: 'thống kê', path: PATH_DASHBOARD.general.pageThree, icon: ICONS.analytics },
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
          { title: 'tất cả', path: PATH_DASHBOARD.users.pageUserList },
          { title: 'thêm mới', path: PATH_DASHBOARD.users.pageFive },
          // { title: 'Six', path: PATH_DASHBOARD.users.pageSix }
        ],
      },
    ],
  },
]

export default sidebarConfig
