import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { LoadingButton } from '@mui/lab'
import { Box, Card, Grid, Stack, Switch, TextField, Typography, FormHelperText, FormControlLabel } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../redux/actions'
import { usersState$ } from '../../../redux/selectors'
// utils
import { fData } from '../../../utils/formatNumber'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
//
import Label from '../../Label'
import { UploadAvatar } from '../../upload'

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
}

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { success, error } = useSelector(usersState$)

  useEffect(() => {
    if (success === 'update') {
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
      navigate(PATH_DASHBOARD.users.root)
    }
    if (success === 'create') {
      enqueueSnackbar('Tạo thành công', { variant: 'success' })
      navigate(PATH_DASHBOARD.users.root)
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [success, error, enqueueSnackbar, navigate])

  const NewUserSchema = Yup.object().shape({
    username: Yup.string().required('Tên tài khoản là bắt buộc'),
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email(),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: currentUser?.username || '',
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      avatar_url: currentUser?.avatar_url || null,
      status_code: currentUser?.status_code,
      role_id: currentUser?.role_id,
      jobs: currentUser?.jobs?.map((job) => job.job_name).join(',') || '',
      skills: currentUser?.skills?.map((skill) => skill.skill_name).join(',') || '',
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const j = values.jobs.split(',')
      const s = values.skills.split(',')
      values.jobs = j
      values.skills = s
      console.log('🚀 ~ file: UserNewForm.js ~ line 55 ~ onSubmit: ~ values', values)
      try {
        dispatch(updateUser.updateUserRequest({ data: values }))
        resetForm()
        setSubmitting(false)
      } catch (error) {
        console.error(error)
        setSubmitting(false)
        setErrors(error)
      }
    },
  })

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik

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
              {isEdit && (
                <Label
                  color={values.status_code !== 'VER' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status_code === 'VER' ? 'Hoạt động' : 'Bị khóa'}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatar_url}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatar_url && errors.avatar_url)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Yêu cầu tệp *.jpeg, *.jpg, *.png, *.gif
                      <br /> kích thước tối đa {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.avatar_url && errors.avatar_url}
                </FormHelperText>
              </Box>

              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) => setFieldValue('status_code', event.target.checked ? 'BAN' : 'VER')}
                      checked={values.status_code === 'BAN'}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Khóa tài khoản
                      </Typography>
                      {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Khóa người dùng
                      </Typography> */}
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    onChange={(event) => setFieldValue('role_id', event.target.checked ? 1 : 2)}
                    checked={values.role_id === 1}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Chỉ định làm Quản trị viên
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Người dùng này sẽ có mọi quyền trên hệ thống
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={isEdit}
                    label="Tên tài khoản"
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Nghề nghiệp"
                    multiline
                    minRows={3}
                    maxRows={5}
                    placeholder="Cách nhau bởi dấu phẩy ,"
                    {...getFieldProps('jobs')}
                    error={Boolean(touched.jobs && errors.jobs)}
                    helperText={touched.jobs && errors.jobs}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Kỹ năng"
                    multiline
                    minRows={3}
                    maxRows={5}
                    placeholder="Cách nhau bởi dấu phẩy ,"
                    {...getFieldProps('skills')}
                    error={Boolean(touched.skills && errors.skills)}
                    helperText={touched.skills && errors.skills}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Tạo mới' : 'Lưu thay đổi'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}
