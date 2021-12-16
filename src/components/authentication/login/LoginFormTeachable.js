import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useFormik, Form, FormikProvider } from 'formik'
import { Icon } from '@iconify/react'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// hooks
import useAuth from '../../../hooks/useAuth'
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, loginVerify, error, success, isVerified } = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [OTP, setOTP] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`${error}`, {
        variant: 'error',
      })
    }
    if (!isVerified && success) {
      handleClickOpen()
    } else if (isVerified && success) {
      enqueueSnackbar('Đăng nhập thành công', {
        variant: 'success',
      })
      navigate('/bang-dieu-khien', { replace: true })
    }
  }, [isVerified, success, error, navigate, enqueueSnackbar])

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Tên tài khoản bắt buộc'),
    password: Yup.string().min(6, 'Mật khẩu từ 6 ký tự trở lên').required('Mật khẩu bắt buộc'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        await login(values.username, values.password, values.remember)
      } catch (error) {
        console.log('🚀 ~ file: LoginFormTeachable.js ~ line 53 ~ onSubmit: ~ error', error)
      }
    },
  })

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleVerify = async () => {
    console.log(OTP)
    await loginVerify(values.username, OTP, values.remember)
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              label="Tên tài khoản"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Mật khẩu"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Nhớ tài khoản"
            />

            <Link component={RouterLink} variant="subtitle2" to="/dat-lai-mat-khau">
              Quên mật khẩu?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Đăng nhập
          </LoadingButton>
        </Form>
      </FormikProvider>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập mã xác thực</DialogTitle>
        <DialogContent>
          <DialogContentText>Một mã xác thực đã được gửi đến email của bạn</DialogContentText>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            variant="outlined"
            label="Mã xác thực"
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="inherit">
            Gửi lại
          </Button> */}
          <Button onClick={handleClose} color="inherit">
            Hủy
          </Button>
          <Button onClick={handleVerify} variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
