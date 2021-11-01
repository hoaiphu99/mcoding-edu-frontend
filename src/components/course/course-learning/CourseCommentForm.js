import { useEffect } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { useFormik, Form, FormikProvider } from 'formik'
import { useSnackbar } from 'notistack'
// material
import { styled } from '@mui/material/styles'
import { Stack, Typography, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createNewComment } from '../../../redux/actions'
import { commentsState$ } from '../../../redux/selectors'
import { SUCCESS_ACTION_TYPE } from '../../../redux/initialState'

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral,
}))

// ----------------------------------------------------------------------
CourseCommentForm.propTypes = {
  lessonID: PropTypes.number,
}

export default function CourseCommentForm({ lessonID }) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const { error, success } = useSelector(commentsState$)
  const key = 'create'
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { preventDuplicate: true, variant: 'error', key })
    }
    if (success === SUCCESS_ACTION_TYPE.CREATE) {
      enqueueSnackbar('Đã đăng bình luận', { preventDuplicate: true, variant: 'success', key })
      dispatch({ type: 'RESET_STATE' })
    }
  }, [error, enqueueSnackbar, success, dispatch])

  const CommentSchema = Yup.object().shape({
    content: Yup.string().required('Chưa nhập bình luận'),
  })

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const data = {
          content: values.content,
          lesson_id: lessonID,
        }
        dispatch(createNewComment.createNewCommentRequest({ data }))
        resetForm()
        setSubmitting(false)
      } catch (error) {
        console.error(error)
        setSubmitting(false)
        setErrors({ afterSubmit: error.code })
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Đăng bình luận
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Nhập bình luận *"
              {...getFieldProps('content')}
              error={Boolean(touched.content && errors.content)}
              helperText={touched.content && errors.content}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Bình luận
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyles>
  )
}
