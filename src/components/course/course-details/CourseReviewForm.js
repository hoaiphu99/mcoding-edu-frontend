import { useEffect } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { useFormik, Form, FormikProvider } from 'formik'
import { useSnackbar } from 'notistack'
// material
import { styled } from '@mui/material/styles'
import { Button, Rating, TextField, Typography, FormHelperText, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createNewReview } from '../../../redux/actions'
import { reviewsState$ } from '../../../redux/selectors'
import { SUCCESS_ACTION_TYPE } from '../../../redux/initialState'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral,
}))

// ----------------------------------------------------------------------

CourseReviewForm.propTypes = {
  onClose: PropTypes.func,
  courseId: PropTypes.number.isRequired,
}

export default function CourseReviewForm({ onClose, courseId, ...other }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { success, error } = useSelector(reviewsState$)

  useEffect(() => {
    if (success === SUCCESS_ACTION_TYPE.CREATE) {
      enqueueSnackbar('Đã đánh giá khóa học này', { variant: 'success' })
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [success, error, enqueueSnackbar])

  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required('Hãy chọn đánh giá'),
    review: Yup.string().required('Chưa nhập đánh đá'),
  })

  const formik = useFormik({
    initialValues: {
      rating: null,
      review: '',
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values, { resetForm, setSubmitting, setErrors }) => {
      try {
        const data = {
          course_id: courseId,
          rating: values.rating,
          details: values.review,
        }
        dispatch(createNewReview.createNewReviewRequest({ data }))
        onClose()
        resetForm()
        setSubmitting(false)
      } catch (error) {
        console.log('🚀 ~ file: CourseReviewForm.js ~ line 63 ~ onSubmit: ~ error', error)
        setErrors(error)
      }
    },
  })

  const { errors, touched, resetForm, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik

  const onCancel = () => {
    onClose()
    resetForm()
  }

  return (
    <RootStyle {...other}>
      <Typography variant="subtitle1" gutterBottom>
        Đánh giá
      </Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={1.5}>
              <Typography variant="body2">Đánh giá của bạn về khóa học này:</Typography>
              <Rating
                {...getFieldProps('rating')}
                onChange={(event) => setFieldValue('rating', Number(event.target.value))}
              />
            </Stack>
            {errors.rating && <FormHelperText error>{touched.rating && errors.rating}</FormHelperText>}

            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Đánh giá *"
              {...getFieldProps('review')}
              error={Boolean(touched.review && errors.review)}
              helperText={touched.review && errors.review}
            />

            <Stack direction="row" justifyContent="flex-end">
              <Button type="button" color="inherit" variant="outlined" onClick={onCancel} sx={{ mr: 1.5 }}>
                Hủy
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Đăng
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  )
}
