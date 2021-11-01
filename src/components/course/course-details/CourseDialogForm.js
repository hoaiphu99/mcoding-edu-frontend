import { useState } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import {
  Stack,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Rating,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

// ----------------------------------------------------------------------

export default function CourseDialogForm() {
  const { enqueueSnackbar } = useSnackbar()

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const reviewSchema = Yup.object().shape({
    content: Yup.string().required('Chưa nhập nội dung'),
    rating: Yup.number().required('Chưa chọn đánh giá'),
  })

  const key = 'create'

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: '',
      rating: 0,
    },
    validationSchema: reviewSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        enqueueSnackbar('Đã đánh giá', { variant: 'success', preventDupplicate: true, key })
        setSubmitting(false)
        handleClose()
        resetForm()
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
        setSubmitting(false)
      }
    },
  })

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik

  return (
    <div>
      <Button variant="contained" color="info" onClick={handleClickOpen}>
        Đánh giá
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Đánh giá khóa học</DialogTitle>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText>Hãy để lại đánh giá của bạn cho khóa học nảy</DialogContentText>

              <Stack spacing={3} direction={{ xs: 'column', md: 'column' }}>
                <Rating
                  name="course-rating"
                  size="large"
                  value={values.rating}
                  onChange={(event, newValue) => {
                    setFieldValue('rating', newValue)
                  }}
                />
                <TextField
                  rows={4}
                  {...getFieldProps('content')}
                  fullWidth
                  multiline
                  label="Nội dung đánh giá"
                  error={Boolean(touched.content && errors.content)}
                  helperText={touched.content && errors.content}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Hủy
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Đánh giá
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  )
}
