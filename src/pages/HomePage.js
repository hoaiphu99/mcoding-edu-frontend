import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// material
import { Box, Container, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
// components
import Page from '../components/Page'
import { CourseList } from '../components/course/course-list'
import { CourseCarouselAnimation } from '../components/carousel'
// redux
import { coursesState$ } from '../redux/selectors'
import { getAllCourses, getCategories, getProgramLanguages } from '../redux/actions'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
})

// ----------------------------------------------------------------------

export default function LandingPage() {
  const dispatch = useDispatch()
  const { data: courses } = useSelector(coursesState$)

  useEffect(() => {
    dispatch(getAllCourses.getAllCoursesRequest())
    dispatch(getCategories.getCategoriesRequest())
    dispatch(getProgramLanguages.getProgramLanguagesRequest())
  }, [dispatch])
  return (
    <RootStyle title="Trang chủ" id="move_top">
      <Container sx={{ mt: 15 }}>
        <CourseCarouselAnimation course={courses} />
        <Divider sx={{ m: 3 }} />
        <Box>
          <Typography variant="h4" gutterBottom>
            Khóa học mới nhất
          </Typography>
          <CourseList courses={courses} />
        </Box>
      </Container>
    </RootStyle>
  )
}
