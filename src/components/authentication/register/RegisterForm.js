import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useSnackbar } from 'notistack'
import { useFormik, Form, FormikProvider } from 'formik'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
import { useNavigate } from 'react-router-dom'
// material
import { Stack, TextField, IconButton, InputAdornment, Select, InputLabel, FormControl } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../redux/actions'
import { userLoginState$ } from '../../../redux/selectors'

// ----------------------------------------------------------------------

const EDUCATION_OPTION = [
  { id: 1, name: 'Học sinh' },
  { id: 2, name: 'Sinh viên' },
  { id: 3, name: 'Đi làm' },
]

export default function RegisterForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { error, success } = useSelector(userLoginState$)

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Quá ngắn!').max(50, 'Quá dài!').required('Họ tên bắt buộc'),
    username: Yup.string().min(2, 'Quá ngắn!').max(50, 'Quá dài!').required('Tên tài khoản'),
    email: Yup.string().email('Email không hợp lệ'),
    education: Yup.string().required('Trình độ học vấn bắt buộc'),
    password: Yup.string().min(6, 'Mật khẩu từ 6 ký tự trở lên').required('Mật khẩu bắt buộc'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
  })

  useEffect(() => {
    if (success) {
      enqueueSnackbar('Đăng ký thành công!', { variant: 'success' })
      navigate('/dashboard', { replace: true })
    }
    if (error) {
      enqueueSnackbar('Đăng ký thất bại!', { variant: 'error' })
    }
  }, [success, error, enqueueSnackbar, navigate])

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      dispatch(registerUser.registerUserRequest(values))
    },
  })

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
          <TextField
            fullWidth
            required
            label="Tên tài khoản"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            required
            label="Họ và tên"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          {/* </Stack> */}

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <FormControl fullWidth>
            <InputLabel>Học vấn</InputLabel>
            <Select label="Học vấn" native {...getFieldProps('education')} value={values.education}>
              {EDUCATION_OPTION.map((education) => (
                <option key={education.id} value={education.id}>
                  {education.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            type={showPasswordConfirmation ? 'text' : 'password'}
            label="Nhập lại mật khẩu"
            {...getFieldProps('passwordConfirmation')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPasswordConfirmation((prev) => !prev)}>
                    <Icon icon={showPasswordConfirmation ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Đăng ký
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
