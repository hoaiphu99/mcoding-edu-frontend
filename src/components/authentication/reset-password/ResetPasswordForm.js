import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { TextField, Alert, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
//
import axios from '../../../utils/axios'

import useIsMountedRef from '../../../hooks/useIsMountedRef'

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
}

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef()

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  })

  const formik = useFormik({
    initialValues: {
      email: 'mcoding.edu@gmail.com',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await axios
          .post('http://localhost:3030/api/auth/forgot-password', { email: values.email })
          .then((res) => {
            if (isMountedRef.current) {
              onSent()
              onGetEmail(values.email)
              setSubmitting(false)
            }

            console.log('🚀 ~ file: ResetPasswordForm.js ~ line 34 ~ awaitaxios.post ~ res', res)
          })
          .catch((err) => {
            console.log('🚀 ~ file: ResetPasswordForm.js ~ line 36 ~ awaitaxios.post ~ err', err)
          })
      } catch (error) {
        console.error(error)
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message })
          setSubmitting(false)
        }
      }
    },
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('email')}
            type="email"
            label="Địa chỉ email"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Gửi email xác nhận
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
