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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// hooks
import useAuth from '../../../hooks/useAuth'
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { studentLogin, studentLoginVerify, error, success, isVerified } = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [OTP, setOTP] = useState('')
  const [open, setOpen] = useState(false)

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
      navigate('/', { replace: true })
    }
  }, [error, navigate, enqueueSnackbar, success, isVerified])

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
    password: Yup.string().min(6, 'Mật khẩu từ 6 ký tự trở lên').required('Mật khẩu bắt buộc'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        await studentLogin(values.email, values.password, values.remember)
      } catch (error) {
        console.log('🚀 ~ file: LoginForm.js ~ line 55 ~ onSubmit: ~ error', error)
      }
    },
  })

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleVerify = async () => {
    console.log(OTP)
    await studentLoginVerify(values.email, OTP, values.remember)
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="email"
              type="text"
              label="Email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
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
