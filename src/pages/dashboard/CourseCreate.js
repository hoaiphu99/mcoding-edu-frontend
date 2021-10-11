import { useEffect } from 'react'
import { paramCase } from 'change-case'
import { useParams, useLocation } from 'react-router-dom'
// material
import { Container } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/actions'
import { coursesState$ } from '../../redux/selectors'
// routes
import { PATH_DASHBOARD } from '../../routes/paths'
// hooks
// components
import Page from '../../components/Page'
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs'
import ProductNewForm from '../../components/_dashboard/course/CourseNewForm'

// ----------------------------------------------------------------------

export default function CourseCreate() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { name } = useParams()
  const { data: courses } = useSelector(coursesState$)
  const isEdit = pathname.includes('edit')
  const currentCourse = courses.find((course) => paramCase(course.name) === name)

  useEffect(() => {
    if (!courses.length) {
      dispatch(getAllCourses.getAllCoursesRequest())
    }
  }, [dispatch, courses])

  return (
    <Page title="Tạo khóa học mới">
      <Container>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo khóa học mới' : 'Chỉnh sửa khóa học'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Khóa học',
              href: PATH_DASHBOARD.courses.root,
            },
            { name: !isEdit ? 'Tạo khoá học mới' : name },
          ]}
        />

        <ProductNewForm isEdit={isEdit} currentCourse={currentCourse} />
      </Container>
    </Page>
  )
}
