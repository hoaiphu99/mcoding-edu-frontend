import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// material
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
// hook
import useAuth from '../hooks/useAuth'

const parseJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')

    return JSON.parse(payload.toString())
  } catch (e) {
    return null
  }
}

const AuthVerify = () => {
  const location = useLocation()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const handleLogout = async () => {
      await logout()
    }
    if (token) {
      const decodedJwt = parseJwt(token)
      const decodedRefreshJwt = parseJwt(refreshToken)
      if (decodedJwt?.exp * 1000 < Date.now() && decodedRefreshJwt?.exp * 1000 < Date.now()) {
        handleLogout()
        setOpen(true)
      }
    }
  }, [location, logout])

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Phiên đăng nhập đã hết hạn</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Để sử dụng được các tính năng của ứng dụng, vui lòng đăng nhập lại.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Tôi đã hiểu
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default AuthVerify
