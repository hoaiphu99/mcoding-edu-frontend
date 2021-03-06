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
import { courseLessonState$ } from '../../../../redux/selectors'
// ----------------------------------------------------------------------

CourseNewSectionForm.propTypes = {
  isEdit: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  section_id: PropTypes.number,
}

export default function CourseNewSectionForm({ isEdit, open, onClose, section_id }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { data: course, error } = useSelector(courseLessonState$)

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
          dispatch(createSection.createSectionRequest({ data }))
        } else {
          data.id = section_id
          dispatch(updateSection.updateSectionRequest({ data }))
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
    resetForm()
    onClose()
  }

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, resetForm } = formik

  return (
    <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}>
      <DialogTitle sx={{ mb: 2 }}>{!isEdit ? 'Thêm chương mới' : 'Chỉnh sửa'}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 1.5 }}>Tạo chương mới cho khóa học</DialogContentText>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Số chương"
                type="number"
                {...getFieldProps('section_number')}
                error={Boolean(touched.section_number && errors.section_number)}
                helperText={
                  (touched.section_number && errors.section_number) || 'Nếu khóa học không có chương để mặc định là 0'
                }
              />
              <TextField
                fullWidth
                label="Tên chương"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={(touched.name && errors.name) || 'Nhập giá trị bất kì nếu khóa học không có chương'}
              />
              <Stack direction="row" justifyContent="flex-end">
                <Button onClick={handleCancel} color="inherit" variant="outlined" sx={{ mr: 1.5 }}>
                  Hủy
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Thêm chương mới' : 'Cập nhật'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  )
}
