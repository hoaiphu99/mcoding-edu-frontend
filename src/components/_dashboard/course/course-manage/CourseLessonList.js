import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
// material
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemSecondaryAction,
} from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteLesson } from '../../../../redux/actions/courseActions'
import { courseLessonState$ } from '../../../../redux/selectors'

// components
import CourseNewLessonForm from './CourseNewLessonForm'
import CourseNewSectionForm from './CourseNewSectionForm'
import CourseAttachment from './CourseAttachment'
import CourseMoreMenu from './CourseMoreMenu'
// ------------------------------------------

export default function CourseManage() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { data: course, error } = useSelector(courseLessonState$)

  const [openLessonForm, setOpenLessonForm] = useState(false)
  const [openNewSectionForm, setOpenNewSectionForm] = useState(false)
  const [openAttachForm, setOpenAttachForm] = useState(false)
  const [sectionID, setSectionID] = useState(0)
  const [lessonID, setLessonID] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  const handleClickOpenNewLessonForm = (id) => {
    setOpenLessonForm(true)
    setSectionID(id)
  }

  const handleClickEditLesson = (sectionID, lessonID) => {
    setOpenLessonForm(true)
    setSectionID(sectionID)
    setLessonID(lessonID)
  }

  const handleClickOpenNewSectionForm = (id) => {
    setOpenNewSectionForm(true)
    setSectionID(id)
  }

  const handleClickOpenAttachForm = (id) => {
    setOpenAttachForm(true)
    setLessonID(id)
  }

  const handleClose = () => {
    setOpenLessonForm(false)
    setOpenNewSectionForm(false)
    setOpenAttachForm(false)
    setIsEdit(false)
  }

  const handleDeleteSection = (id) => {
    dispatch(deleteSection.deleteSectionRequest({ id }))
    enqueueSnackbar('Xóa thành công', { variant: 'success' })
  }

  const handleDeleteLesson = (id) => {
    dispatch(deleteLesson.deleteLessonRequest({ id }))
    enqueueSnackbar('Xóa thành công', { variant: 'success' })
  }

  return (
    <>
      {course && course.sections.length <= 0
        ? 'Không có bài học nào'
        : course.sections.map((section) => (
            <Card key={section.section_id} sx={{ mb: 2 }}>
              <CardHeader
                title={`Chương ${section.section_number}: ${section.name} `}
                action={
                  <CourseMoreMenu
                    onOpen={() => handleClickOpenNewLessonForm(section.section_id)}
                    onOpenSection={() => handleClickOpenNewSectionForm(section.section_id)}
                    onDelete={() => handleDeleteSection(section.section_id)}
                    onEdit={() => setIsEdit(true)}
                  />
                }
              />
              <CardContent>
                <List>
                  {section.lessons.length <= 0
                    ? 'Không có bài học nào'
                    : section.lessons.map((lesson) => (
                        <ListItem key={lesson.lesson_id} disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary={`Bài ${lesson.lesson_number}: ${lesson.name}`} />
                            <ListItemSecondaryAction>
                              <CourseMoreMenu
                                onOpen={() => handleClickEditLesson(section.section_id, lesson.lesson_id)}
                                onOpenAttach={() => handleClickOpenAttachForm(lesson.lesson_id)}
                                onDelete={() => handleDeleteLesson(lesson.lesson_id)}
                                onEdit={() => setIsEdit(true)}
                                isLesson={Boolean(true)}
                                lessonId={lesson.lesson_id}
                              />
                            </ListItemSecondaryAction>
                          </ListItemButton>
                        </ListItem>
                      ))}
                </List>
              </CardContent>
            </Card>
          ))}
      {openLessonForm && (
        <CourseNewLessonForm
          isEdit={isEdit}
          open={openLessonForm}
          onClose={handleClose}
          section_id={sectionID}
          lesson_id={lessonID}
        />
      )}
      {openNewSectionForm && (
        <CourseNewSectionForm isEdit={isEdit} open={openNewSectionForm} onClose={handleClose} section_id={sectionID} />
      )}
      {openAttachForm && <CourseAttachment open={openAttachForm} onClose={handleClose} lesson_id={lessonID} />}
    </>
  )
}
