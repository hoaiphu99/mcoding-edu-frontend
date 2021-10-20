import * as Yup from 'yup'
import { useEffect } from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
// material
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogContentText, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createSection, updateSection } from '../../../../redux/actions'
import { userLoginState$, courseLessonState$ } from '../../../../redux/selectors'
// ----------------------------------------------------------------------

const DialogConfirm = ({ isEdit, onClose, open, section_id }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { data: course, error } = useSelector(courseLessonState$)
  const { data: userLogin } = useSelector(userLoginState$)

  const currentSection = course.sections.find((item) => item.section_id === section_id)

  const newSectionSchema = Yup.object().shape({
    section_number: Yup.number().required('Số chương bắt buộc'),
    name: Yup.string().required('Tên chương bắt buộc'),
  })

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [enqueueSnackbar, error])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      section_number: (currentSection && currentSection.section_number) || 0,
      name: (currentSection && currentSection.name) || '',
    },
    validationSchema: newSectionSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const data = {
        course_id: course.course_id,
        ...values,
      }
      try {
        if (!isEdit) {
          dispatch(createSection.createSectionRequest({ data, userLogin }))
        } else {
          data.id = section_id
          dispatch(updateSection.updateSectionRequest({ data, userLogin }))
        }
        handleCancel()
        resetForm()
        setSubmitting(false)
        enqueueSnackbar(`${!isEdit ? 'Tạo thành công' : 'Đã cập nhật'}`, { variant: 'success' })
      } catch (error) {
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
    <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}>
      <DialogTitle sx={{ mb: 2 }}>{!isEdit ? 'Thêm chương mới' : 'Chỉnh sửa'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Tạo chương mới cho khóa học</DialogContentText>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Số chương"
                type="number"
                {...getFieldProps('section_number')}
                error={Boolean(touched.section_number && errors.section_number)}
                helperText={touched.section_number && errors.section_number}
              />
              <TextField
                fullWidth
                label="Tên chương"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Thêm chương mới' : 'Cập nhật'}
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
  isEdit: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  section_id: PropTypes.number,
}

CourseNewSectionForm.propTypes = {
  isEdit: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  section_id: PropTypes.number,
}

export default function CourseNewSectionForm({ isEdit, open, onClose, section_id }) {
  return (
    <div>
      <DialogConfirm isEdit={isEdit} open={open} onClose={onClose} section_id={section_id} />
    </div>
  )
}
