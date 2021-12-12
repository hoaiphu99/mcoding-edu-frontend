import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import { Card, Grid, Stack, Typography, FormHelperText } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createAssignments, updateAssignments } from '../../../../redux/actions'
import { assignmentsState$ } from '../../../../redux/selectors'
//
import { QuillEditor } from '../../../editor'

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}))

// ----------------------------------------------------------------------

AssignmentsNewForm.propTypes = {
  lessonId: PropTypes.number.isRequired,
  assignments: PropTypes.object,
  isEdit: PropTypes.bool,
}

export default function AssignmentsNewForm({ isEdit, lessonId, assignments }) {
  const dispatch = useDispatch()
  const { success, error } = useSelector(assignmentsState$)

  const { enqueueSnackbar } = useSnackbar()

  const NewProductSchema = Yup.object().shape({
    details: Yup.string().required('Nội dung không được trống'),
  })

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
    if (success === 'create') {
      enqueueSnackbar('Tạo thành công', { variant: 'success' })
    }
  }, [dispatch, enqueueSnackbar, error, success])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      details: assignments?.details || '',
      answer: assignments?.answer || '',
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const data = {
          id: assignments?.assignments_id,
          lesson_id: lessonId,
          ...values,
        }
        if (isEdit) {
          dispatch(updateAssignments.updateAssignmentsRequest({ data }))
        } else {
          dispatch(createAssignments.createAssignmentsRequest({ data }))
        }
        resetForm()
        setSubmitting(false)
      } catch (error) {
        console.error(error)
        setSubmitting(false)
        setErrors(error)
      }
    },
  })

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue } = formik

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <LabelStyle>Nội dung bài tập</LabelStyle>
                  <QuillEditor
                    simple
                    id="details"
                    value={values.details}
                    onChange={(val) => setFieldValue('details', val)}
                    error={Boolean(touched.details && errors.details)}
                  />
                  {touched.details && errors.details && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.details && errors.details}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <LabelStyle>Nội dung câu trả lời</LabelStyle>
                  <QuillEditor
                    simple
                    id="answer"
                    value={values.answer}
                    onChange={(val) => setFieldValue('answer', val)}
                    error={Boolean(touched.answer && errors.answer)}
                  />
                  {touched.answer && errors.answer && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.answer && errors.answer}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                Cập nhật
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}
