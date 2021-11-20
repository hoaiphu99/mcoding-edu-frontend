import * as Yup from 'yup'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { useFormik, Form, FormikProvider } from 'formik'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
  FormHelperText,
  Box,
  Modal,
  CircularProgress,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createLesson, updateLesson } from '../../../../redux/actions'
import { courseLessonState$ } from '../../../../redux/selectors'
// Components
import { UploadSingleFile } from '../../../upload'
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const ModalUpload = ({ open }) => (
  <Modal open={open}>
    <Box sx={style} aria-labelledby="modal-modal-title">
      <CircularProgress />
      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mr: 1.5 }}>
        Đang upload video
      </Typography>
    </Box>
  </Modal>
)

ModalUpload.propTypes = {
  open: PropTypes.bool.isRequired,
}

CourseAddLessonForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  section_id: PropTypes.number.isRequired,
  lesson_id: PropTypes.number,
  isEdit: PropTypes.bool,
}

export default function CourseAddLessonForm({ isEdit, open, onClose, section_id, lesson_id }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [openModal, setOpenModal] = useState(false)

  const [disableForm, setDisableForm] = useState(true)

  const { data: course, error } = useSelector(courseLessonState$)

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
      video: null,
    },
    validationSchema: newLessonSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let videoUrl = values.video_url
      if (values.video) {
        videoUrl = await handleUpload(values.video)
      }
      const data = {
        course_id: course.course_id,
        section_id,
        video_url: videoUrl,
        lesson_number: values.lesson_number,
        name: values.name,
      }
      console.log('🚀 ~ file: CourseNewLessonForm.js ~ line 117 ~ onSubmit: ~ data', data)
      try {
        if (!isEdit) {
          dispatch(createLesson.createLessonRequest({ data }))
        } else {
          data.id = lesson_id
          dispatch(updateLesson.updateLessonRequest({ data }))
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
  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, resetForm, setFieldValue } = formik

  const handleCancel = () => {
    resetForm()
    setOpenModal(false)
    onClose()
  }

  const handleClickOpenModal = () => {
    setOpenModal(true)
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      console.log('🚀 ~ file: CourseNewLessonForm.js ~ line 101 ~ CourseAddLessonForm ~ file', file)

      setFieldValue(
        'video',
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )
      setFieldValue('video_url', file.name)
    },
    [setFieldValue],
  )

  const handleUpload = async (file) => {
    const formData = new FormData()
    formData.set('file', file, `${file.name}`)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      const {
        data: { data },
      } = await axios.post('/api/upload/video', formData, config)
      console.log('🚀 ~ file: CourseNewLessonForm.js ~ line 132 ~ handleUpload ~ data', data)

      return data.webViewLink
    } catch (error) {
      console.log(error)
      return error
    }
  }

  return (
    <>
      <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 1035 } }}>
        <DialogTitle sx={{ mb: 2 }}>{!isEdit ? 'Thêm bài học mới' : 'Cập nhật'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 1.5 }}>Tạo bài học mới cho chương</DialogContentText>
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
                <Stack spacing={1} direction="row">
                  <TextField
                    fullWidth
                    disabled={disableForm}
                    label="Liên kết video"
                    {...getFieldProps('video_url')}
                    error={Boolean(touched.video_url && errors.video_url)}
                    helperText={touched.video_url && errors.video_url}
                  />
                  {disableForm ? (
                    <Button color="inherit" variant="outlined" onClick={() => setDisableForm(false)}>
                      Sửa
                    </Button>
                  ) : (
                    <Button color="inherit" variant="outlined" onClick={() => setDisableForm(true)}>
                      Xong
                    </Button>
                  )}
                </Stack>
                <div>
                  <LabelStyle>Hoặc tải video lên</LabelStyle>
                  <UploadSingleFile
                    maxSize={1000 * 1024 * 1024}
                    accept="video/*"
                    file={values.video}
                    isVideo={Boolean(true)}
                    onDrop={handleDrop}
                    error={Boolean(touched.video && errors.video)}
                  />
                  {touched.video && errors.video && (
                    <FormHelperText error sx={{ px: 2 }}>
                      Lỗi: {touched.video && errors.video}
                    </FormHelperText>
                  )}
                </div>
                <Stack direction="row" justifyContent="flex-end">
                  <Button onClick={handleCancel} color="inherit" variant="outlined" sx={{ mr: 1.5 }}>
                    Hủy
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    onClick={handleClickOpenModal}
                  >
                    {!isEdit ? 'Thêm' : 'Cập nhật'}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
      <ModalUpload open={openModal} />
    </>
  )
}
