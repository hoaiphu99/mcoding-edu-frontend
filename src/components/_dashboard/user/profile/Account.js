import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { Box, Grid, Card, Stack, TextField, Typography, FormHelperText, FormControlLabel, Switch } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// hooks
import useAuth from '../../../../hooks/useAuth'
import useIsMountedRef from '../../../../hooks/useIsMountedRef'
import { UploadAvatar } from '../../../upload'
// components
import { Block } from '../../../Block'
// utils
import { fData } from '../../../../utils/formatNumber'
//
// import countries from '../countries'

// ----------------------------------------------------------------------

export default function Account() {
  const isMountedRef = useIsMountedRef()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { user, updateProfile, updateProfileStudent } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên bắt buộc'),
    email: Yup.string().email('Email không hợp lệ').required('Email bắt buộc'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      student_id: user?.student_id || null,
      username: user?.username,
      name: user?.name || '',
      email: user?.email || '',
      is2fa: user?.is_2fa || false,
      avatarUrl: user?.avatar_url || '',
      preAvatar: user?.avatar_url || null,
      phone: user?.phone || '',
      education: user?.education || '',
      jobs: user?.jobs?.map((job) => job.job_name).join(',') || '',
      skills: user?.skills?.map((skill) => skill.skill_name).join(',') || '',
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log('🚀 ~ file: Account.js ~ line 55 ~ onSubmit: ~ values', values)

      try {
        if (user?.student_id) {
          await updateProfileStudent({ ...values })
        } else {
          const j = values.jobs.split(',')
          const s = values.skills.split(',')
          values.jobs = j
          values.skills = s
          await updateProfile({ ...values })
        }
        enqueueSnackbar('Đã cập nhật', { variant: 'success' })
        if (isMountedRef.current) {
          setSubmitting(false)
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code })
          setSubmitting(false)
        }
      }
    },
  })

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setFieldValue('preAvatar', {
          ...file,
          preview: URL.createObjectURL(file),
        })
      }
      const newAvatar = await handleUpload(file)
      console.log('🚀 ~ file: Account.js ~ line 87 ~ newAvatar', newAvatar)
      setFieldValue('avatarUrl', newAvatar)
    },

    [setFieldValue],
  )

  const handleUpload = async (file) => {
    const formData = new FormData()
    formData.set('image', file, `${file.name}`)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      const newImage = {
        imageName: data.fileName,
        imageLink: data.fileLocation,
      }
      return newImage.imageLink
    } catch (error) {
      console.log(error)
      return error
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center', mb: 3 }}>
              <UploadAvatar
                accept="image/*"
                file={values.preAvatar}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.avatarUrl && errors.avatarUrl)}
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
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.avatarUrl && errors.avatarUrl}
              </FormHelperText>
            </Card>
            <Block title="Bảo mật">
              <FormControlLabel
                control={<Switch {...getFieldProps('is2fa')} checked={values.is2fa} />}
                label="Xác thực 2 bước"
                sx={{ mb: 2 }}
              />
            </Block>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  {user?.username && (
                    <TextField fullWidth disabled label="Tên tài khoản" {...getFieldProps('username')} />
                  )}
                  {user?.student_id && (
                    <TextField fullWidth disabled label="Mã học viên" {...getFieldProps('student_id')} />
                  )}
                  <TextField fullWidth label="Họ và tên" {...getFieldProps('name')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Email" {...getFieldProps('email')} />
                  <TextField fullWidth label="Số điện thoại" {...getFieldProps('phone')} />
                </Stack>
                {user?.student_id && <TextField fullWidth label="Học vấn" {...getFieldProps('education')} />}
                {user?.username && (
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
                )}
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Cập nhật
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}
