import { useState, useEffect } from 'react'
import slugify from 'slugify'
import { useSnackbar } from 'notistack'
// import { sentenceCase } from 'change-case'
import { useParams, useNavigate } from 'react-router-dom'

// material
import { Card, CardContent, Grid, Skeleton, Container, Typography, CardHeader } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCourseLesson, getCommentsByLessonID } from '../redux/actions'
import { coursesState$, courseLessonState$, commentsState$ } from '../redux/selectors'
// hook
import useAuth from '../hooks/useAuth'
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

  const { user } = useAuth()

  const [lessonID, setLessonID] = useState(null)

  const { data: courses } = useSelector(coursesState$)

  const { data: course, error } = useSelector(courseLessonState$)
  const { data: comments } = useSelector(commentsState$)

  const courseID = courses.find((item) => slugify(item.name, { lower: true, locale: 'vi' }) === slug)?.course_id

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    if (!courses.length) {
      dispatch(getAllCourses.getAllCoursesRequest({ query: 'all=true' }))
    }

    if (!course || course.course_id !== courseID) {
      dispatch(getCourseLesson.getCourseLessonRequest({ id: courseID }))
    }
    if (course) {
      setLessonID(course.sections[0]?.lessons[0]?.lesson_id)
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [dispatch, courses, course, courseID, error, enqueueSnackbar])

  useEffect(() => {
    if (lessonID) {
      dispatch(getCommentsByLessonID.getCommentsByLessonIDRequest({ id: lessonID }))
    }
  }, [lessonID, dispatch])

  const handleChangeLesson = (id) => {
    setLessonID(id)
  }

  return (
    <Page title={`${course && course.name}`}>
      <Container>
        <HeaderBreadcrumbs
          sx={{ mb: 5, mt: 15 }}
          heading={`${course && course.name}`}
          links={[
            { name: 'Trang chủ', href: '/' },
            {
              name: 'Khóa học',
              href: `${PATH_PAGE.courses}/${course && slugify(course.name, { lower: true, locale: 'vi' })}`,
            },
            { name: `${course && course.name}` },
          ]}
        />
        {!lessonID && <Typography variant="h6">Khóa học này chưa có bài học nào</Typography>}
        {course && (
          <>
            <CourseLessonList course={course} onChangeLesson={handleChangeLesson} />
          </>
        )}
        {course?.sections[0] && lessonID && (
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Bình luận" />
            <CardContent>
              {(user.student_id || user?.username === course.user.username) && (
                <CourseCommentForm lessonID={lessonID} />
              )}

              {comments && comments.length <= 0 ? (
                <Typography variant="subtitle1">Không có bình luận nào</Typography>
              ) : (
                <CourseCommentList comments={comments} teachable={course.user} />
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
