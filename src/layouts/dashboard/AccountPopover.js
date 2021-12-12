import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import { useSnackbar } from 'notistack'
import homeFill from '@iconify/icons-eva/home-fill'
import personFill from '@iconify/icons-eva/person-fill'
// import settings2Fill from '@iconify/icons-eva/settings-2-fill'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
// material
import { alpha } from '@mui/material/styles'
import { Avatar, Button, Box, Divider, MenuItem, Typography } from '@mui/material'
// components
import { MIconButton } from '../../components/@material-extend'
import MenuPopover from '../../components/MenuPopover'
// hook
import useAuth from '../../hooks/useAuth'
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  { label: 'Trang chủ', icon: homeFill, linkTo: '/' },
  { label: 'Trang cá nhân', icon: personFill, linkTo: '/trang-ca-nhan' },
  // { label: 'Settings', icon: settings2Fill, linkTo: '#' },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { logout, user } = useAuth()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    enqueueSnackbar('Đăng xuất thành công', {
      variant: 'success',
    })
    navigate('/', { replace: true })
  }

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar alt="My Avatar" src={user?.avatar_url} />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.username}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={handleLogout} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
