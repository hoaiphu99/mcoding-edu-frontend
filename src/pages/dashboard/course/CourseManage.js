import { useState, useEffect } from 'react'
import slugify from 'slugify'
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import { useSnackbar } from 'notistack'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCourseLesson } from '../../../redux/actions'
import { coursesState$, courseLessonState$ } from '../../../redux/selectors'
// hook
import useAuth from '../../../hooks/useAuth'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// components
import Page from '../../../components/Page'
// import Markdown from '../components/Markdown'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import { ManageCourseLesson, CourseNewSectionForm } from '../../../components/_dashboard/course/course-manage'

// ----------------------------------------------------------------------

export default function CourseLearning() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAuth()

  const [open, setOpen] = useState(false)

  const { data: courses } = useSelector(coursesState$)
  const { data: course, error } = useSelector(courseLessonState$)

  const courseID = courses.find((item) => slugify(item.name, { lower: true, locale: 'vi' }) === slug)?.course_id

  const handleClickOpen = () => {
    setOpen((prev) => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!courses || courses.length <= 0) {
      dispatch(getAllCourses.getAllCoursesRequest())
    }
  }, [dispatch, courses, enqueueSnackbar])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    if (!course) {
      dispatch(getCourseLesson.getCourseLessonRequest({ id: courseID }))
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [dispatch, course, courseID, error, enqueueSnackbar, user, navigate])

  return (
    <Page title="Quản lý khóa học">
      <Container>
        <HeaderBreadcrumbs
          heading={`${course && course.name}`}
          links={[
            { name: 'Trang chủ', href: '/' },
            { name: 'Khóa học', href: PATH_DASHBOARD.courses.courseList },
            { name: 'Quản lý khóa học' },
          ]}
          action={
            <Button variant="contained" onClick={handleClickOpen} startIcon={<Icon icon={plusFill} />}>
              Chương mới
            </Button>
          }
        />

        {course && (
          <>
            <CourseNewSectionForm open={open} onClose={handleClose} />

            <ManageCourseLesson />
          </>
        )}
      </Container>
    </Page>
  )
}
