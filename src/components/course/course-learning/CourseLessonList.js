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
import { getAttachmentsByLessonId } from '../../../redux/actions'
import { attachmentsState$ } from '../../../redux/selectors'
// components
import Page from '../../Page'
import CourseVideoEmbed from './CourseVideoEmbed'
import CourseAttachmentList from './CourseAttachmentList'

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
  const [value, setValue] = useState('1')
  const [videoUrl, setVideoUrl] = useState('')

  const dispatch = useDispatch()
  const { data } = useSelector(attachmentsState$)

  const [lesson_id, setLesson_id] = useState(undefined)
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonNumber, setLessonNumber] = useState(1)

  useEffect(() => {
    setLesson_id(sections.length > 0 ? sections[0].lessons[0]?.lesson_id : undefined)
    setVideoUrl(sections.length > 0 ? sections[0].lessons[0]?.video_url : '')
    setLessonTitle(sections.length > 0 ? sections[0].lessons[0]?.name : '')
    setLessonNumber(sections.length > 0 ? sections[0].lessons[0]?.lesson_number : '')
  }, [sections])

  useEffect(() => {
    if (lesson_id) {
      dispatch(getAttachmentsByLessonId.getAttachmentsByLessonIdRequest({ lessonId: lesson_id }))
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
            </TabList>
          </Box>
          <Divider />
          <TabPanel value="1">
            <Box>
              <RootStyle>
                <Container>
                  {sections.length === 0 ? (
                    <Typography>Không có bài học nào</Typography>
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
        </TabContext>
      </Card>
    </RootStyle>
  )
}
