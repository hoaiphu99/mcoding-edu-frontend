import { useEffect } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik, Form, FormikProvider } from 'formik'
// material
import { Stack, Card, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { changeUserPassword, changeStudentPassword } from '../../../../redux/actions'
import { userProfileState$, studentsState$ } from '../../../../redux/selectors'
// hooks
import useAuth from '../../../../hooks/useAuth'

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { success, error } = useSelector(userProfileState$)
  const { success: successStudent, error: errorStudent } = useSelector(studentsState$)
  const { user } = useAuth()

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Nhập mật khẩu cũ'),
    newPassword: Yup.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên').required('Nhập mật khẩu mới'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu mới không khớp'),
  })

  useEffect(() => {
    if (success === 'update' || successStudent === 'update') {
      enqueueSnackbar('Lưu thành công', { variant: 'success' })
    }
    if (error || errorStudent) {
      enqueueSnackbar(error || errorStudent, { variant: 'error' })
    }
  }, [success, error, successStudent, errorStudent, enqueueSnackbar])

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (user?.username) dispatch(changeUserPassword.changeUserPasswordRequest({ data: values }))
        else if (user?.student_id) dispatch(changeStudentPassword.changeStudentPasswordRequest({ data: values }))
        setSubmitting(false)
        resetForm()
      } catch (error) {
        console.log('🚀 ~ file: AccountChangePassword.js ~ line 39 ~ onSubmit: ~ error', error)
        setSubmitting(false)
      }
    },
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Mật khẩu cũ"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Mật khẩu mới"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={(touched.newPassword && errors.newPassword) || 'Mật khẩu phải trên 6 ký tự'}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Nhập lại mật khẩu mới"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Lưu thay đổi
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  )
}
