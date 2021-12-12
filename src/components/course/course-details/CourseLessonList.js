import { Icon } from '@iconify/react'
// import { useState } from 'react'
import PropTypes from 'prop-types'
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill'
// material
import { styled } from '@mui/material/styles'
import { Container, Accordion, AccordionSummary, Typography, AccordionDetails, Divider } from '@mui/material'
// components
import Page from '../../Page'

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
  // const [controlled, setControlled] = useState(false)

  // const handleChangeControlled = (panel) => (event, isExpanded) => {
  //   setControlled(isExpanded ? panel : false)
  // }

  return (
    <RootStyle>
      <Container>
        {(sections.length === 0 && <Typography>Không có bài học nào</Typography>) ||
        (sections.length === 1 && sections[0]?.section_number === 0)
          ? sections[0]?.lessons.map((lesson) => (
              <>
                <Typography key={lesson.lesson_id} sx={{ p: 1, mb: 1, mt: 1 }}>
                  Bài {lesson.lesson_number}: {lesson.name}
                </Typography>
              </>
            ))
          : sections.map((section) => (
              <Accordion key={section.section_id}>
                <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                  <Typography variant="subtitle1">
                    Chương {section.section_number}: {section.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {section.lessons.map((lesson, index) => (
                    <>
                      <Typography key={lesson.lesson_id} sx={{ p: 1, mb: 1, mt: 1 }}>
                        Bài {lesson.lesson_number}: {lesson.name}
                      </Typography>
                      {index === section.lessons.length - 1 ? null : <Divider />}
                    </>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
      </Container>
    </RootStyle>
  )
}
