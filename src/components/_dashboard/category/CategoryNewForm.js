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
import { createCategory, updateCategory } from '../../../redux/actions'
import { categoriesState$ } from '../../../redux/selectors'

// ----------------------------------------------------------------------

CategoryNewForm.propTypes = {
  isEdit: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category_id: PropTypes.number,
}

export default function CategoryNewForm({ isEdit, open, onClose, category_id }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { data: categories, error, success } = useSelector(categoriesState$)

  const currentCategory = categories.find((item) => item.category_id === category_id)

  const newSectionSchema = Yup.object().shape({
    name: Yup.string().required('Tên danh mục bắt buộc'),
  })

  useEffect(() => {
    if (success === 'create') {
      enqueueSnackbar('Tạo thành công', { variant: 'success' })
    }
    if (success === 'update') {
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [enqueueSnackbar, error, success])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (currentCategory && currentCategory.name) || '',
      description: (currentCategory && currentCategory.description) || '',
    },
    validationSchema: newSectionSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const data = {
        ...values,
      }
      try {
        if (!isEdit) {
          dispatch(createCategory.createCategoryRequest({ data }))
        } else {
          data.id = category_id
          dispatch(updateCategory.updateCategoryRequest({ data }))
        }
        handleCancel()
        resetForm()
        setSubmitting(false)
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
    <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}>
      <DialogTitle sx={{ mb: 2 }}>{!isEdit ? 'Thêm danh mục' : 'Chỉnh sửa'}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 1.5 }} />
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Tên danh mục"
                type="text"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                label="Mô tả"
                type="text"
                multiline
                minRows={3}
                maxRows={5}
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />

              <Stack direction="row" justifyContent="flex-end">
                <Button onClick={handleCancel} color="inherit" variant="outlined" sx={{ mr: 1.5 }}>
                  Hủy
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Thêm' : 'Cập nhật'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  )
}
