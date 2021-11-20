import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useFormik, Form, FormikProvider } from 'formik'
import { Icon } from '@iconify/react'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// hooks
import useAuth from '../../../hooks/useAuth'
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { studentLogin, error, success } = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (error) {
      console.log('🚀 ~ file: LoginForm.js ~ line 25 ~ useEffect ~ error', error)
      enqueueSnackbar(`${error}`, {
        variant: 'error',
      })
    }
    if (success) {
      enqueueSnackbar('Đăng nhập thành công', {
        variant: 'success',
      })
      navigate('/dashboard', { replace: true })
    }
  }, [error, navigate, enqueueSnackbar, success])

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
        await studentLogin(values.email, values.password)
      } catch (error) {
        console.log('🚀 ~ file: LoginForm.js ~ line 55 ~ onSubmit: ~ error', error)
      }
    },
  })

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
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

          <Link component={RouterLink} variant="subtitle2" to="#">
            Quên mật khẩu?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Đăng nhập
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
