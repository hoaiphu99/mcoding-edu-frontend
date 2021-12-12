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
import { coursesPublicState$ } from '../redux/selectors'
import { getAllCoursesPublic, getCategories, getPrograming } from '../redux/actions'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
})

// ----------------------------------------------------------------------

export default function HomePage() {
  const dispatch = useDispatch()
  const { data: courses } = useSelector(coursesPublicState$)

  const query = `public=true`

  useEffect(() => {
    dispatch(getAllCoursesPublic.getAllCoursesPublicRequest({ query }))
    dispatch(getCategories.getCategoriesRequest())
    dispatch(getPrograming.getProgramingRequest())
  }, [dispatch, query])
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
