import { Icon } from '@iconify/react'
import homeFill from '@iconify/icons-eva/home-fill'
import fileFill from '@iconify/icons-eva/file-fill'
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
  {
    title: 'Danh mục',
    path: '#',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Danh mục',
        // items: [
        //   { title: 'Lập trình web', path: PATH_PAGE.webDev },
        //   { title: 'Lập trình mobile', path: PATH_PAGE.mobileDev },
        //   { title: 'Lập trình game', path: PATH_PAGE.gameDev },
        //   { title: 'Lập trình ứng dụng', path: PATH_PAGE.applicationDev },
        //   { title: 'Machine Learning - AI', path: PATH_PAGE.AI },
        //   { title: 'Lập trình nhúng', path: PATH_PAGE.embeddedDev },
        //   { title: 'Automation Test', path: PATH_PAGE.automationTest },
        //   { title: 'Lập trình cơ bản', path: PATH_PAGE.basicDev },
        //   { title: 'Lập trình nâng cao', path: PATH_PAGE.advancedDev },
        // ],
      },
    ],
  },
]

export default menuConfig
