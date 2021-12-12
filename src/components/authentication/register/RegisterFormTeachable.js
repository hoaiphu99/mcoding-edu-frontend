import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useSnackbar } from 'notistack'
import { useFormik, Form, FormikProvider } from 'formik'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
// import { useNavigate } from 'react-router-dom'
// material
import { Stack, TextField, IconButton, InputAdornment, Alert, AlertTitle } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// hook
import useAuth from '../../../hooks/useAuth'
// ----------------------------------------------------------------------

export default function RegisterFormProfessor() {
  // const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { register, success, error } = useAuth()
  console.log('🚀 ~ file: RegisterFormTeachable.js ~ line 22 ~ RegisterFormProfessor ~ success', success)

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Quá ngắn!').max(50, 'Quá dài!').required('Họ tên bắt buộc'),
    username: Yup.string().min(2, 'Quá ngắn!').max(50, 'Quá dài!').required('Tên tài khoản'),
    email: Yup.string().email('Email không hợp lệ'),
    job: Yup.string().min(2, 'Quá ngắn!').max(50, 'Quá dài!'),
    skill: Yup.string().min(2, 'Quá ngắn!').max(50, 'Quá dài!'),
    password: Yup.string().min(6, 'Mật khẩu từ 6 ký tự trở lên').required('Mật khẩu bắt buộc'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
  })

  useEffect(() => {
    if (success) {
      enqueueSnackbar('Chúng tôi đã gửi thông tin đăng ký về email của bạn —>Xin hãy kiểm tra email!', {
        variant: 'success',
      })
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [success, error, enqueueSnackbar])

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      job: '',
      skill: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const jobs = values.job.split(',')
      const skills = values.skill.split(',')
      const data = {
        ...values,
        jobs,
        skills,
      }
      try {
        await register(data)
      } catch (error) {
        console.log('🚀 ~ file: RegisterFormTeachable.js ~ line 70 ~ onSubmit: ~ error', error)
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {success && (
            <Alert severity="info">
              <AlertTitle>Đăng ký thành công</AlertTitle>
              Chúng tôi đã gửi thông tin đăng ký về email của bạn — <strong>Xin hãy kiểm tra email!</strong>
            </Alert>
          )}
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
          <TextField
            fullWidth
            type="text"
            label="Nghề nghiệp"
            multiline
            minRows={3}
            maxRows={5}
            placeholder="Cách nhau bởi dấu phẩy ,"
            {...getFieldProps('job')}
            error={Boolean(touched.job && errors.job)}
            helperText={touched.job && errors.job}
          />

          <TextField
            fullWidth
            type="text"
            label="Kỹ năng"
            multiline
            minRows={3}
            maxRows={5}
            placeholder="Cách nhau bởi dấu phẩy ,"
            {...getFieldProps('skill')}
            error={Boolean(touched.skill && errors.skill)}
            helperText={touched.skill && errors.skill}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Đăng ký
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
