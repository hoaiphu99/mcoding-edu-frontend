import { Icon } from '@iconify/react'
import homeFill from '@iconify/icons-eva/home-fill'
// import fileFill from '@iconify/icons-eva/file-fill'
import bookOpenFill from '@iconify/icons-eva/book-open-fill'
// routes
import { PATH_PAGE } from '../../routes/paths'

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
}

const menuConfig = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  // { title: 'Dashboard', path: PATH_DASHBOARD.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  { title: 'Khóa học', path: PATH_PAGE.courses, icon: <Icon icon={bookOpenFill} {...ICON_SIZE} /> },
]

export default menuConfig
