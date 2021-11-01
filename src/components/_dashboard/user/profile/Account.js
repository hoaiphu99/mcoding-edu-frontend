import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { Box, Grid, Card, Stack, TextField, Typography, FormHelperText } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// hooks
import useAuth from '../../../../hooks/useAuth'
import useIsMountedRef from '../../../../hooks/useIsMountedRef'
import { UploadAvatar } from '../../../upload'
// utils
import { fData } from '../../../../utils/formatNumber'
//
// import countries from '../countries'

// ----------------------------------------------------------------------

export default function Account() {
  const isMountedRef = useIsMountedRef()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { user, updateProfile } = useAuth()

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
      username: user?.username,
      name: user?.name || '',
      email: user?.email || '',
      avatarUrl: user?.avatar_url,
      phone: user?.phone,
      education: user?.student?.education,
      job: user?.professor?.job,
      skill: user?.professor?.skill,
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values })
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
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.avatarUrl}
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
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth disabled label="Tên tài khoản" {...getFieldProps('username')} />
                  <TextField fullWidth label="Họ và tên" {...getFieldProps('name')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Email" {...getFieldProps('email')} />
                  <TextField fullWidth label="Số điện thoại" {...getFieldProps('phone')} />
                </Stack>
                {user?.student && <TextField fullWidth label="Học vấn" {...getFieldProps('education')} />}
                {user?.professor && (
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField fullWidth label="Nghề nghiệp" {...getFieldProps('job')} />
                    <TextField fullWidth label="Kỹ năng" {...getFieldProps('skill')} />
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
