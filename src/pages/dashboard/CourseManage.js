import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import { useSnackbar } from 'notistack'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getCourseLesson } from '../../redux/actions'
import { courseLessonState$, userLoginState$ } from '../../redux/selectors'
// routes
import { PATH_DASHBOARD } from '../../routes/paths'
// components
import Page from '../../components/Page'
// import Markdown from '../components/Markdown'
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs'
import { ManageCourseLesson, CourseNewSectionForm } from '../../components/_dashboard/course/course-manage'

// ----------------------------------------------------------------------

export default function CourseLearning() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const [open, setOpen] = useState(false)

  const { data: userLogin } = useSelector(userLoginState$)
  const { data: course, error } = useSelector(courseLessonState$)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
            <ManageCourseLesson />
            <CourseNewSectionForm open={open} onClose={handleClose} />
          </>
        )}
      </Container>
    </Page>
  )
}
