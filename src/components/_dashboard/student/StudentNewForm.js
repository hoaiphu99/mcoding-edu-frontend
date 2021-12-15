import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
// import { useSnackbar } from 'notistack'
// import { useNavigate } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
// material
// import { LoadingButton } from '@mui/lab'
import {
  Box,
  Card,
  Grid,
  Stack,
  MenuItem,
  TextField,
  // Typography,
  FormHelperText,
  // FormControlLabel,
} from '@mui/material'
//
import Label from '../../Label'
import { UploadAvatar } from '../../upload'

// ----------------------------------------------------------------------
const EDUCATION_LEVEL = [
  { value: '1', label: 'Học sinh' },
  { value: '2', label: 'Sinh viên' },
  { value: '3', label: 'Đã tốt nghiệp' },
  { value: '4', label: 'Khác' },
]

StudentNewForm.propTypes = {
  // isEdit: PropTypes.bool,
  currentStudent: PropTypes.object,
}

export default function StudentNewForm({ currentStudent }) {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email(),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      student_id: currentStudent?.student_id || '',
      name: currentStudent?.name || '',
      email: currentStudent?.email || '',
      phone: currentStudent?.phone || '',
      avatar_url: currentStudent?.avatar_url || null,
      is_banned: currentStudent?.is_banned || false,
      education: currentStudent?.education || '',
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log('🚀 ~ file: UserNewForm.js ~ line 55 ~ onSubmit: ~ values', values)
      try {
        resetForm()
        setSubmitting(false)
      } catch (error) {
        console.error(error)
        setSubmitting(false)
        setErrors(error)
      }
    },
  })

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file),
        })
      }
    },
    [setFieldValue],
  )

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Label
                color={values.is_banned ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {!values.is_banned ? 'Hoạt động' : 'Bị khóa'}
              </Label>

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  disabled={Boolean(true)}
                  accept="image/*"
                  file={values.avatar_url}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatar_url && errors.avatar_url)}
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.avatar_url && errors.avatar_url}
                </FormHelperText>
              </Box>

              {/* <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('is_banned')} checked={values.is_banned} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Khóa tài khoản
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              /> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Mã học viên"
                    InputProps={{
                      readOnly: true,
                    }}
                    {...getFieldProps('student_id')}
                    error={Boolean(touched.student_id && errors.student_id)}
                    helperText={touched.student_id && errors.student_id}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ email"
                    InputProps={{
                      readOnly: true,
                    }}
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    InputProps={{
                      readOnly: true,
                    }}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    InputProps={{
                      readOnly: true,
                    }}
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Stack>
                <TextField
                  select
                  label="Học vấn"
                  value={values.education}
                  InputProps={{
                    readOnly: true,
                  }}
                >
                  {EDUCATION_LEVEL.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                {/* <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Tạo mới' : 'Lưu thay đổi'}
                  </LoadingButton>
                </Box> */}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}
