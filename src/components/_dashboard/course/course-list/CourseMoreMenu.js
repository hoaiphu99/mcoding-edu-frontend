import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import editFill from '@iconify/icons-eva/edit-fill'
import { Link as RouterLink } from 'react-router-dom'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import bookOpenFill from '@iconify/icons-eva/book-open-fill'
import usersIcon from '@iconify/icons-fa-solid/users'
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material'
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths'

// ----------------------------------------------------------------------

CourseMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  courseSlug: PropTypes.string,
  courseId: PropTypes.number,
}

export default function CourseMoreMenu({ onDelete, courseSlug, courseId }) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.courses.root}/manage/${courseSlug}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={bookOpenFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Quản lý khóa học" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.courses.root}/${courseId}/students`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={usersIcon} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Danh sách học viên" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.courses.root}/${courseSlug}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'red' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  )
}
