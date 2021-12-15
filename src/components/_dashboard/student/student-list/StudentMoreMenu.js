import propTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import eyeOutline from '@iconify/icons-eva/eye-outline'
import { Link as RouterLink } from 'react-router-dom'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import lockFill from '@iconify/icons-eva/lock-fill'
import unlockOutline from '@iconify/icons-eva/unlock-outline'
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material'
//
import { PATH_DASHBOARD } from '../../../../routes/paths'

// ----------------------------------------------------------------------

StudentMoreMenu.propTypes = {
  onBanned: propTypes.func,
  isBanned: propTypes.bool,
  studentId: propTypes.number,
}

export default function StudentMoreMenu({ onBanned, isBanned, studentId }) {
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
          to={`${PATH_DASHBOARD.students.root}/${studentId}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={eyeOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xem thông tin" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {!isBanned ? (
          <MenuItem sx={{ color: 'error' }} onClick={onBanned}>
            <ListItemIcon>
              <Icon icon={lockFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Khóa người dùng" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          <MenuItem sx={{ color: 'error' }} onClick={onBanned}>
            <ListItemIcon>
              <Icon icon={unlockOutline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Mở khóa " primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
