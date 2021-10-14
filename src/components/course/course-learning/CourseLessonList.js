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
// components
import Page from '../../Page'
import CourseVideoEmbed from './CourseVideoEmbed'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

// ----------------------------------------------------------------------
CourseLessonList.propTypes = {
  course: PropTypes.object.isRequired,
}

export default function CourseLessonList({ course }) {
  const { sections } = course
  const [value, setValue] = useState('1')
  const [videoUrl, setVideoUrl] = useState('')
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonNumber, setLessonNumber] = useState(1)

  useEffect(() => {
    setVideoUrl(sections.length > 0 ? sections[0].lessons[0].video_url : '')
    setLessonTitle(sections.length > 0 ? sections[0].lessons[0].name : '')
    setLessonNumber(sections.length > 0 ? sections[0].lessons[0].lesson_number : '')
  }, [sections])

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeLesson = (lesson) => {
    setVideoUrl(lesson.video_url)
    setLessonTitle(lesson.name)
    setLessonNumber(lesson.lesson_number)
  }

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CourseVideoEmbed videoUrl={videoUrl} />
      </Card>
      <Typography variant="h6" component="h2" sx={{ pl: 2 }}>
        {sections.length > 0 ? `Bài ${lessonNumber}: ${lessonTitle}` : ''}
      </Typography>
      <Card sx={{ mb: 2, mt: 2 }}>
        <TabContext value={value}>
          <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
            <TabList onChange={handleChangeTab}>
              <Tab value="1" label="Danh sách bài học" sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }} />
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
                                <ListItemButton sx={{ pl: 4 }} onClick={() => handleChangeLesson(lesson)}>
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
        </TabContext>
      </Card>
    </>
  )
}

/*
<List component="div" disablePadding>
                              
                            </List>
                            */
