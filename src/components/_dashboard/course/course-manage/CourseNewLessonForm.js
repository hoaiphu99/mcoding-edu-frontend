import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
// material
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogContentText, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createLesson, updateLesson } from '../../../../redux/actions'
import { userLoginState$, courseLessonState$ } from '../../../../redux/selectors'
// ----------------------------------------------------------------------

const DialogConfirm = ({ isEdit, onClose, open, section_id, lesson_id }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { data: course, error } = useSelector(courseLessonState$)
  const { data: userLogin } = useSelector(userLoginState$)

  const currentLesson = course.sections
    .find((section) => section.section_id === section_id)
    .lessons.find((lesson) => lesson.lesson_id === lesson_id)

  const newLessonSchema = Yup.object().shape({
    lesson_number: Yup.number().required('Số bài bắt buộc'),
    name: Yup.string().required('Tên bài bắt buộc'),
    video_url: Yup.string().required('Link video bắt buộc'),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lesson_number: (currentLesson && currentLesson.lesson_number) || 0,
      name: (currentLesson && currentLesson.name) || '',
      video_url: (currentLesson && currentLesson.video_url) || '',
    },
    validationSchema: newLessonSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const data = {
        course_id: course.course_id,
        section_id,
        ...values,
      }
      try {
        if (!isEdit) {
          dispatch(createLesson.createLessonRequest({ data, userLogin }))
        } else {
          data.id = lesson_id
          dispatch(updateLesson.updateLessonRequest({ data, userLogin }))
        }
        resetForm()
        setSubmitting(false)
        if (!error) enqueueSnackbar(`${!isEdit ? 'Thêm thành công' : 'Cập nhật thành công'}`, { variant: 'success' })
        handleCancel()
      } catch (error) {
        enqueueSnackbar(error, { variant: 'error' })
        setSubmitting(false)
        setErrors(error)
      }
    },
  })

  const handleCancel = () => {
    onClose()
  }

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

  return (
    <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}>
      <DialogTitle sx={{ mb: 2 }}>{!isEdit ? 'Thêm bài học mới' : 'Cập nhật'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Tạo bài học mới cho chương</DialogContentText>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Số bài"
                type="number"
                {...getFieldProps('lesson_number')}
                error={Boolean(touched.lesson_number && errors.lesson_number)}
                helperText={touched.lesson_number && errors.lesson_number}
              />
              <TextField
                fullWidth
                label="Tên bài"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                label="Liên kết video"
                {...getFieldProps('video_url')}
                error={Boolean(touched.video_url && errors.video_url)}
                helperText={touched.video_url && errors.video_url}
              />
              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Thêm' : 'Cập nhật'}
              </LoadingButton>
              <Button onClick={handleCancel} color="inherit">
                Hủy
              </Button>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  )
}

DialogConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  section_id: PropTypes.number.isRequired,
  lesson_id: PropTypes.number,
  isEdit: PropTypes.bool,
}

CourseAddLessonForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  section_id: PropTypes.number.isRequired,
  lesson_id: PropTypes.number,
  isEdit: PropTypes.bool,
}

export default function CourseAddLessonForm({ isEdit, open, onClose, section_id, lesson_id }) {
  return (
    <div>
      <DialogConfirm isEdit={isEdit} open={open} onClose={onClose} section_id={section_id} lesson_id={lesson_id} />
    </div>
  )
}
