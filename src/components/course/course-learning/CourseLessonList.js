import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import PropTypes from 'prop-types'
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill'
// material
import { styled } from '@mui/material/styles'
import {
  Box,
  Tab,
  Card,
  Divider,
  Typography,
  Container,
  Accordion,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAttachmentsByLessonId, getAssignmentsByLessonId } from '../../../redux/actions'
import { attachmentsState$, assignmentsState$ } from '../../../redux/selectors'
// utils
import axios from '../../../utils/axios'
// hooks
import useAuth from '../../../hooks/useAuth'
// components
import Page from '../../Page'
import CourseVideoEmbed from './CourseVideoEmbed'
import CourseAttachmentList from './CourseAttachmentList'
import Markdown from '../../Markdown'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

// ----------------------------------------------------------------------
CourseLessonList.propTypes = {
  course: PropTypes.object.isRequired,
  onChangeLesson: PropTypes.func.isRequired,
}

export default function CourseLessonList({ course, onChangeLesson }) {
  const { sections } = course
  console.log('🚀 ~ file: CourseLessonList.js ~ line 52 ~ CourseLessonList ~ sections', sections)

  const { user } = useAuth()

  const dispatch = useDispatch()
  const { data } = useSelector(attachmentsState$)
  const { data: assignments } = useSelector(assignmentsState$)

  const [countdown, setCountdown] = useState(0)
  const [value, setValue] = useState('1')
  const [videoUrl, setVideoUrl] = useState('')
  const [lesson_id, setLesson_id] = useState(undefined)
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonNumber, setLessonNumber] = useState(1)

  useEffect(() => {
    let timerId = null
    async function updateProcess() {
      if (countdown === 0) {
        await axios
          .post(`http://localhost:3030/api/lessons/learned/${lesson_id}`, {
            learned: true,
            courseId: course.course_id,
          })
          .then((res) => {
            console.log('🚀 ~ file: CourseLessonList.js ~ line 78 ~ .then ~ res', res)
          })
          .catch((err) => {
            console.log('🚀 ~ file: CourseLessonList.js ~ line 81 ~ .then ~ err', err)
          })
      }
    }
    if (user && user?.student_id) {
      if (countdown > 0) {
        timerId = setTimeout(() => {
          setCountdown(countdown - 1)
        }, 1000)
      }

      updateProcess()
    }
    return () => clearTimeout(timerId)
  }, [user, countdown, course, lesson_id])

  useEffect(() => {
    setLesson_id(sections.length > 0 ? sections[0].lessons[0]?.lesson_id : undefined)
    setVideoUrl(sections.length > 0 ? sections[0].lessons[0]?.video_url : '')
    setLessonTitle(sections.length > 0 ? sections[0].lessons[0]?.name : '')
    setLessonNumber(sections.length > 0 ? sections[0].lessons[0]?.lesson_number : '')
    setCountdown(sections.length > 0 ? sections[0].lessons[0]?.duration : 0)
  }, [sections])

  useEffect(() => {
    if (lesson_id) {
      dispatch(getAttachmentsByLessonId.getAttachmentsByLessonIdRequest({ lessonId: lesson_id }))
      dispatch(getAssignmentsByLessonId.getAssignmentsByLessonIdRequest({ lessonId: lesson_id }))
    }
  }, [dispatch, lesson_id])

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeLesson = (lesson) => {
    setLesson_id(lesson.lesson_id)
    setVideoUrl(lesson.video_url)
    setLessonTitle(lesson.name)
    setLessonNumber(lesson.lesson_number)
    setCountdown(lesson.duration)
  }

  return (
    <RootStyle>
      <Card sx={{ mb: 2 }}>{videoUrl && <CourseVideoEmbed videoUrl={videoUrl} />}</Card>
      <Typography variant="h6" component="h2" sx={{ pl: 2 }}>
        {sections.length > 0 && lessonNumber ? `Bài ${lessonNumber}: ${lessonTitle}` : ''}
      </Typography>
      <Card sx={{ mb: 2, mt: 2 }}>
        <TabContext value={value}>
          <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
            <TabList onChange={handleChangeTab}>
              <Tab disableRipple value="1" label="Danh sách bài học" />
              <Tab
                disableRipple
                value="2"
                label={`Tệp đính kèm (${data?.count})`}
                sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
              />
              <Tab disableRipple value="3" label="Bài tập" sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }} />
            </TabList>
          </Box>
          <Divider />
          <TabPanel value="1">
            <Box>
              <RootStyle>
                <Container>
                  {(sections.length === 0 && <Typography>Không có bài học nào</Typography>) ||
                  (sections.length === 1 && sections[0]?.section_number === 0) ? (
                    <List>
                      {sections[0]?.lessons.map((lesson) => (
                        <ListItem key={lesson.lesson_id} disablePadding>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                              handleChangeLesson(lesson)
                              onChangeLesson(lesson.lesson_id)
                            }}
                          >
                            <ListItemText primary={`Bài ${lesson.lesson_number}: ${lesson.name}`} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    sections.map((section) => (
                      <Accordion key={section.section_id}>
                        <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                          <Typography variant="subtitle1">{`Chương ${section.section_number}: ${section.name}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List>
                            {section.lessons.map((lesson) => (
                              <ListItem key={lesson.lesson_id} disablePadding>
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  onClick={() => {
                                    handleChangeLesson(lesson)
                                    onChangeLesson(lesson.lesson_id)
                                  }}
                                >
                                  <ListItemText primary={`Bài ${lesson.lesson_number}: ${lesson.name}`} />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )}
                </Container>
              </RootStyle>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ p: 3 }}>
              <CourseAttachmentList attachments={data?.attachments} />
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box sx={{ p: 3 }}>
              {assignments && (
                <>
                  <Markdown children={assignments.details} />
                  <Accordion key={assignments.assignments_id}>
                    <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                      <Typography variant="subtitle1">Trả lời</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Markdown children={assignments.answer} />
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </Box>
          </TabPanel>
        </TabContext>
      </Card>
    </RootStyle>
  )
}
