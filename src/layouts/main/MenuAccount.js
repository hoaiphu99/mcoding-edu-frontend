import React, { useState, useRef } from 'react'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import personFill from '@iconify/icons-eva/person-fill'
import settings2Fill from '@iconify/icons-eva/settings-2-fill'
// Material UI
import { alpha } from '@mui/material/styles'
import { Box, MenuItem, Divider, Avatar, Typography, Button } from '@mui/material'
// hooks
import useAuth from '../../hooks/useAuth'
// Components
import MenuPopover from '../../components/MenuPopover'
import { MIconButton } from '../../components/@material-extend'
// redux
import { authUser } from '../../redux/actions'

// ------------------------------------------------------------------

const MENU_OPTIONS = [
  { label: 'Trang cá nhân', icon: personFill, linkTo: '/trang-ca-nhan', access: 'protect' },
  { label: 'Dashboard', icon: settings2Fill, linkTo: '/dashboard', access: 'private' },
]

MenuAccount.propTypes = {
  userLogin: PropTypes.object,
}

export default function MenuAccount({ userLogin }) {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { logout } = useAuth()

  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    dispatch(authUser.authUserLogout())
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
        <Avatar
          alt="My Avatar"
          src={userLogin.avatar_url ? userLogin.avatar_url : '/static/mock-images/avatars/avatar_default.jpg'}
        />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {userLogin.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userLogin.username}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.filter((option) => {
          if (userLogin.student) return option.access === 'protect'
          return option
        }).map((option) => (
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
            Đăng xuất
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
