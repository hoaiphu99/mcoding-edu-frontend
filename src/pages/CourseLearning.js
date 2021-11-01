import { useState, useEffect } from 'react'
// import { Icon } from '@iconify/react'
import { useSnackbar } from 'notistack'
// import { sentenceCase } from 'change-case'
import { useParams, useNavigate } from 'react-router-dom'

// material
import { Card, CardContent, Grid, Skeleton, Container, Typography } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getCourseLesson, getCommentsByLessonID } from '../redux/actions'
import { courseLessonState$, userLoginState$, commentsState$ } from '../redux/selectors'

// routes
import { PATH_PAGE } from '../routes/paths'
// components
import Page from '../components/Page'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs'
import { CourseLessonList, CourseCommentList, CourseCommentForm } from '../components/course/course-learning'

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={12} lg={12}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      <Skeleton variant="text" height={240} width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
  </Grid>
)

export default function CourseLearning() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const [lessonID, setLessonID] = useState(null)

  const { data: userLogin } = useSelector(userLoginState$)
  const { data: course, error } = useSelector(courseLessonState$)
  const { data: comments } = useSelector(commentsState$)

  useEffect(() => {
    if (!userLogin) {
      navigate('/login')
    }
    if (!course || course.slug !== slug) {
      dispatch(getCourseLesson.getCourseLessonRequest({ slug }))
    }
    if (course) {
      setLessonID(course.sections[0]?.lessons[0].lesson_id)
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [dispatch, course, slug, error, enqueueSnackbar, userLogin, navigate])

  useEffect(() => {
    if (lessonID) {
      dispatch(getCommentsByLessonID.getCommentsByLessonIDRequest({ id: lessonID }))
    }
  }, [lessonID, dispatch])

  const handleChangeLesson = (id) => {
    setLessonID(id)
  }

  return (
    <Page title={`${course && course.slug}`}>
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
            <CourseLessonList course={course} onChangeLesson={handleChangeLesson} />
            {/* <CourseProfessorDetails course={course} /> */}
          </>
        )}
        {course?.sections[0] && (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <CourseCommentForm lessonID={lessonID} />
              {comments && comments.length <= 0 ? (
                <Typography variant="subtitle1">Không có bình luận nào</Typography>
              ) : (
                <CourseCommentList comments={comments} />
              )}
            </CardContent>
          </Card>
        )}

        {!course && SkeletonLoad}

        {error && <Typography variant="h6">404 Không tìm thấy khóa học</Typography>}
      </Container>
    </Page>
  )
}
