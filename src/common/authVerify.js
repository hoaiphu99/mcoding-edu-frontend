import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
// material
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
// redux
import { authUser } from '../redux/actions'

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
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      const decodedJwt = parseJwt(user.token)
      if (decodedJwt?.exp * 1000 < Date.now()) {
        setOpen(true)
        dispatch(authUser.authUserLogout())
      }
    }
  }, [dispatch, location])

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
