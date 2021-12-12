import * as Yup from 'yup'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import {
  Card,
  Chip,
  Grid,
  Stack,
  Select,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  Autocomplete,
  FormHelperText,
} from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createCourse, updateCourse, getCategories, getPrograming } from '../../../redux/actions'
import { coursesState$, categoriesState$, programingState$ } from '../../../redux/selectors'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
//
import { QuillEditor } from '../../editor'
import { UploadSingleFile } from '../../upload'

// ----------------------------------------------------------------------

// const CATEGORY_OPTION = [
//   { id: 1, name: 'Lập trình website' },
//   { id: 2, name: 'Machine Learning' },
//   { id: 3, name: 'Lập trình windows form' },
// ]

// const TAGS_OPTION = [
//   { id: 1, name: 'Javascript' },
//   { id: 2, name: 'Python' },
//   { id: 3, name: 'HTML' },
//   { id: 4, name: 'CSS' },
// ]

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}))

// ----------------------------------------------------------------------

CourseNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCourse: PropTypes.object,
}

export default function CourseNewForm({ isEdit, currentCourse }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector(coursesState$)
  const { data: categories } = useSelector(categoriesState$)
  const { data: programing } = useSelector(programingState$)

  const { enqueueSnackbar } = useSnackbar()

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Tên khóa học không được trống'),
    description: Yup.string().required('Hãy viết mô tả'),
    image_url: Yup.mixed().required('Chưa chọn hình đại diện'),
    course_languages: Yup.array().min(1, 'Chọn ít nhất một ngôn ngữ lập trình'),
  })

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
    dispatch(getCategories.getCategoriesRequest())
    dispatch(getPrograming.getProgramingRequest())
  }, [enqueueSnackbar, error, dispatch])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentCourse?.name || '',
      description: currentCourse?.description || '',
      image_url: currentCourse?.image_url || null,
      category_id: currentCourse?.category_id || categories[0]?.category_id,
      course_languages: currentCourse?.programingLanguages || [programing[0]],
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const arrCourseLanguage = values.course_languages.map((item) => item.prolang_id)
        console.log('🚀 ~ file: CourseNewForm.js ~ line 97 ~ onSubmit: ~ arrCourseLanguage', arrCourseLanguage)
        const data = {
          name: values.name,
          description: values.description,
          category_id: values.category_id,
          course_languages: arrCourseLanguage,
        }
        if (!isEdit) {
          const urlImg = await handleUpload(values.image_url)
          data.image_url = urlImg

          dispatch(createCourse.createCourseRequest({ data }))
        } else {
          data.id = currentCourse.course_id

          dispatch(updateCourse.updateCourseRequest({ data }))
        }

        resetForm()
        setSubmitting(false)
        enqueueSnackbar(!isEdit ? 'Tạo thành công' : 'Cập nhật thành công', { variant: 'success' })
        navigate(PATH_DASHBOARD.courses.courseList)
      } catch (error) {
        console.error(error)
        setSubmitting(false)
        setErrors(error)
      }
    },
  })

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]

      setFieldValue(
        'image_url',
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )
    },
    [setFieldValue],
  )

  const handleUpload = async (file) => {
    const formData = new FormData()
    formData.set('image', file, `${file.name}`)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      const newImage = {
        imageName: data.fileName,
        imageLink: data.fileLocation,
      }
      return newImage.imageLink
    } catch (error) {
      console.log(error)
      return error
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Tên khóa học"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div>
                  <LabelStyle>Mô tả khóa học</LabelStyle>
                  <QuillEditor
                    simple
                    id="product-description"
                    value={values.description}
                    onChange={(val) => setFieldValue('description', val)}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                </div>

                <div>
                  <LabelStyle>Thêm hình đại diện</LabelStyle>
                  <UploadSingleFile
                    maxSize={1000 * 1024 * 1024}
                    accept="image/*"
                    file={values.image_url}
                    onDrop={handleDrop}
                    error={Boolean(touched.image_url && errors.image_url)}
                  />
                  {touched.image_url && errors.image_url && (
                    <FormHelperText error sx={{ px: 2 }}>
                      Lỗi: {touched.image_url && errors.image_url}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select label="Category" native {...getFieldProps('category_id')} value={values.category_id}>
                      {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <div>
                    <Autocomplete
                      multiple
                      freeSolo
                      value={values.course_languages}
                      onChange={(event, newValue) => {
                        setFieldValue('course_languages', newValue)
                      }}
                      options={programing.map((option) => option)}
                      getOptionLabel={(option) => option.name}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option?.prolang_id}
                            size="small"
                            label={option?.name}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Yêu cầu kỹ năng" {...params} />}
                    />
                    {touched.course_languages && errors.course_languages && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.course_languages && errors.course_languages}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>

              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Tạo khóa học' : 'Lưu thay đổi'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}
