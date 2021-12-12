import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik, Form, FormikProvider } from 'formik'
import { Icon } from '@iconify/react'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import axios from '../../../utils/axios'
// ----------------------------------------------------------------------

export default function NewPasswordForm() {
  const navigate = useNavigate()
  const param = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const { token } = param

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  useEffect(() => {
    if (success && message) {
      enqueueSnackbar(message, {
        variant: 'success',
      })
    } else if (message) {
      enqueueSnackbar(message, { variant: 'error' })
      setSuccess(false)
      setMessage('')
    }
    return () => {
      if (success) {
        navigate('/login', { replace: true })
      }
    }
  }, [success, message, navigate, enqueueSnackbar])

  const LoginSchema = Yup.object().shape({
    newPassword: Yup.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên').required('Nhập mật khẩu mới'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu mới không khớp'),
  })

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axios
          .post('/api/auth/new-password', { newPassword: values.newPassword, token })
          .then((res) => {
            console.log('🚀 ~ file: NewPasswordForm.js ~ line 55 ~ .then ~ res', res)
            setSuccess(true)
            setMessage(res.data.message)
          })
          .catch((err) => {
            console.log('🚀 ~ file: NewPasswordForm.js ~ line 59 ~ onSubmit: ~ err', err)
            setSuccess(false)
            setMessage(err.message)
          })
        setSubmitting(false)
        resetForm()
      } catch (error) {
        setSubmitting(false)
        resetForm()
        console.log('🚀 ~ file: LoginFormTeachable.js ~ line 53 ~ onSubmit: ~ error', error)
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            {...getFieldProps('newPassword')}
            fullWidth
            autoComplete="on"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu mới"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={(touched.newPassword && errors.newPassword) || 'Mật khẩu phải trên 6 ký tự'}
          />

          <TextField
            {...getFieldProps('confirmNewPassword')}
            fullWidth
            autoComplete="on"
            type={showPasswordConfirmation ? 'text' : 'password'}
            label="Nhập lại mật khẩu mới"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPasswordConfirmation((prev) => !prev)} edge="end">
                    <Icon icon={showPasswordConfirmation ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Đặt lại mật khẩu mới
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
