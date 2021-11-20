import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import attachFill from '@iconify/icons-eva/attach-fill'
import trashFill from '@iconify/icons-eva/trash-fill'
// material
import { styled } from '@mui/material/styles'
import {
  Link,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Modal,
  CircularProgress,
  Box,
  Tooltip,
} from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAttachmentsByLessonId, createAttachment, deleteAttachment, getLessonById } from '../../../../redux/actions'
import { attachmentsState$, lessonDetailsState$ } from '../../../../redux/selectors'

// ----------------------------------------------------------------------

const Input = styled('input')({
  display: 'none',
})

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
      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mx: 1.5 }}>
        Đang tải tệp lên. Vui lòng đợi...
      </Typography>
    </Box>
  </Modal>
)

ModalUpload.propTypes = {
  open: PropTypes.bool.isRequired,
}

CourseAttachment.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lesson_id: PropTypes.number,
}

export default function CourseAttachment({ open, onClose, lesson_id }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [openModal, setOpenModal] = useState(false)
  const [currentFiles, setCurrentFiles] = useState([])
  const [files, setFiles] = useState([])
  const [countFileAdd, setCountFileAdd] = useState(0)

  const { data: lesson } = useSelector(lessonDetailsState$)

  const {
    data: { attachments },
    error: errorAttachments,
    success,
  } = useSelector(attachmentsState$)

  useEffect(() => {
    if (!lesson || lesson.lesson_id !== lesson_id) {
      dispatch(getLessonById.getLessonByIdRequest({ id: lesson_id }))
      dispatch(getAttachmentsByLessonId.getAttachmentsByLessonIdRequest({ lessonId: lesson_id }))
    }
    if (attachments) {
      setCurrentFiles(attachments)
    }
  }, [attachments, lesson, dispatch, lesson_id])

  useEffect(() => {
    if (success === 'delete') {
      enqueueSnackbar('Xóa tệp thành công', { variant: 'success' })
      dispatch({
        type: 'RESET_STATE',
      })
    }
    if (errorAttachments) {
      enqueueSnackbar(errorAttachments, { variant: 'error' })
    }
  }, [errorAttachments, enqueueSnackbar, dispatch, success])

  const handleCancel = () => {
    setOpenModal(false)
    onClose()
  }

  const handleClickOpenModal = () => {
    setOpenModal(true)
  }

  const handleUploadFile = async (e) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('file', file)

    const { data } = await axios.post(`/api/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const attach = {
      attachment_id: data.data.id,
      file_name: data.data.name,
      file_url: data.data.webContentLink,
    }
    setCountFileAdd((prev) => prev + 1)
    setCurrentFiles((prev) => [...prev, attach])
    setFiles((prev) => [...prev, data.data])
    setOpenModal(false)
  }

  const handleSave = async () => {
    if (countFileAdd <= 0) {
      handleCancel()
    } else {
      const data = {
        attachments: files.map((file) => ({
          file_name: file.name,
          file_url: file.webContentLink,
        })),
        lesson_id,
      }

      try {
        dispatch(createAttachment.createAttachmentRequest({ data }))
        enqueueSnackbar('Đã lưu', { variant: 'success' })
        dispatch({
          type: 'RESET_STATE',
        })
        handleCancel()
      } catch (error) {
        enqueueSnackbar(error, { variant: 'error' })
      }
      setCountFileAdd(0)
    }
  }

  const handleDelete = (id) => {
    try {
      dispatch(deleteAttachment.deleteAttachmentRequest({ id }))
      setCurrentFiles((prev) => prev.filter((item) => item.attachment_id !== id))
      setFiles((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }

  return (
    <>
      <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}>
        <DialogTitle sx={{ mb: 2 }}>Tệp đính kèm</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 1.5 }}>Thêm tệp đính kèm</DialogContentText>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="contained-button-file">
            <Input
              accept="*"
              id="contained-button-file"
              type="file"
              onChange={(e) => {
                handleUploadFile(e)
                handleClickOpenModal()
              }}
            />
            <Button variant="contained" component="span">
              Tải tệp lên
            </Button>
          </label>
          <Divider sx={{ mt: 1 }} />
          <Stack spacing={1}>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Danh sách tệp đính kèm
            </Typography>
            {attachments?.length <= 0 && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                Không có tệp đính kèm
              </Typography>
            )}
            <List>
              {currentFiles.map((file) => (
                <ListItem
                  key={file.attachment_id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(file.attachment_id)}>
                      <Icon icon={trashFill} width={24} height={24} />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Icon icon={attachFill} width={24} height={24} />
                    </Avatar>
                  </ListItemAvatar>
                  <Tooltip title="Nhấn để tải xuống" placement="top">
                    <Link href={file.file_url} underline="none" color="inherit">
                      <ListItemText primary={file.file_name} />
                    </Link>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Stack>

          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            <Stack spacing={1} direction="row">
              <Button onClick={handleCancel} color="inherit" variant="outlined" sx={{ mr: 1.5 }}>
                Hủy
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Xong
              </Button>
            </Stack>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <ModalUpload open={openModal} />
    </>
  )
}
