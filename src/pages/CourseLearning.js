import { useEffect } from 'react'
// import { Icon } from '@iconify/react'
import { useSnackbar } from 'notistack'
// import { sentenceCase } from 'change-case'
import { useParams, useNavigate } from 'react-router-dom'
// import clockFill from '@iconify/icons-eva/clock-fill'
// import roundVerified from '@iconify/icons-ic/round-verified'
// import roundVerifiedUser from '@iconify/icons-ic/round-verified-user'
// material
// import { alpha, styled } from '@mui/material/styles'
import { Grid, Skeleton, Container, Typography } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getCourseLesson } from '../redux/actions'
import { courseLessonState$, userLoginState$ } from '../redux/selectors'
// routes
import { PATH_PAGE } from '../routes/paths'
// components
import Page from '../components/Page'
// import Markdown from '../components/Markdown'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs'
import { CourseLessonList } from '../components/course/course-learning'

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={12} lg={12}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      <Skeleton variant="text" height={240} width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      <Skeleton variant="text" height={240} width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      <Skeleton variant="text" height={240} width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      <Skeleton variant="text" height={240} width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
  </Grid>
)

export default function CourseLearning() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const { data: userLogin } = useSelector(userLoginState$)
  const { data: course, error } = useSelector(courseLessonState$)

  useEffect(() => {
    if (!userLogin) {
      navigate('/login')
    }
    if (!course || course.slug !== slug) {
      dispatch(getCourseLesson.getCourseLessonRequest({ data: slug, userLogin }))
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [dispatch, course, slug, error, enqueueSnackbar, userLogin, navigate])

  return (
    <Page title={`${course && course.name}`}>
      <Container>
        <HeaderBreadcrumbs
          sx={{ mb: 5, mt: 15 }}
          heading={`${course && course.name}`}
          links={[
            { name: 'Trang chủ', href: '/' },
            { name: 'Khóa học', href: PATH_PAGE.courses },
            { name: `${course && course.name}` },
          ]}
        />

        {course && (
          <>
            <CourseLessonList course={course} />
            {/* <CourseProfessorDetails course={course} /> */}
          </>
        )}

        {!course && SkeletonLoad}

        {error && <Typography variant="h6">404 Không tìm thấy khóa học</Typography>}
      </Container>
    </Page>
  )
}
