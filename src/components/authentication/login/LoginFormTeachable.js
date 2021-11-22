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
  const { login, error, success } = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`${error}`, {
        variant: 'error',
      })
    }
    if (success) {
      enqueueSnackbar('Đăng nhập thành công', {
        variant: 'success',
      })
      navigate('/bang-dieu-khien', { replace: true })
    }
  }, [error, success, navigate, enqueueSnackbar])

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
      await login(values.username, values.password)
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
