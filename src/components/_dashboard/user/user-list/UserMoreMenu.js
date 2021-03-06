import propTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import editFill from '@iconify/icons-eva/edit-fill'
import { Link as RouterLink } from 'react-router-dom'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import lockFill from '@iconify/icons-eva/lock-fill'
import unlockOutline from '@iconify/icons-eva/unlock-outline'
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material'
//
import { PATH_DASHBOARD } from '../../../../routes/paths'

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  onBanned: propTypes.func,
  statusCode: propTypes.string,
  username: propTypes.string,
}

export default function UserMoreMenu({ onBanned, statusCode, username }) {
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
        {statusCode === 'VER' ? (
          <MenuItem sx={{ color: 'error' }} onClick={onBanned}>
            <ListItemIcon>
              <Icon icon={lockFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Khóa người dùng" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          statusCode === 'BAN' && (
            <MenuItem sx={{ color: 'error' }} onClick={onBanned}>
              <ListItemIcon>
                <Icon icon={unlockOutline} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Mở khóa " primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          )
        )}

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.users.root}/${username}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Chỉnh sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  )
}
