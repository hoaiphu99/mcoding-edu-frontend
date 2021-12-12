import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import slugify from 'slugify'
// material
import { Container } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getAssignmentsByLessonId } from '../../../redux/actions'
import { coursesState$, assignmentsState$ } from '../../../redux/selectors'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// hooks
// components
import Page from '../../../components/Page'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import AssignmentsNewForm from '../../../components/_dashboard/course/course-manage/AssignmentsNewForm'

// ----------------------------------------------------------------------

export default function Assignments() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const { id } = useParams()
  const { data: courses } = useSelector(coursesState$)
  const { data: assignments } = useSelector(assignmentsState$)

  useEffect(() => {
    dispatch(getAssignmentsByLessonId.getAssignmentsByLessonIdRequest({ lessonId: id }))
    if (!courses.length) dispatch(getAllCourses.getAllCoursesRequest({ query: 'all=true' }))
  }, [dispatch, courses, id])

  return (
    <Page title="Bài tập">
      <Container>
        <HeaderBreadcrumbs
          heading="Bài tập"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Khóa học',
              href: PATH_DASHBOARD.courses.root,
            },
            {
              name: `${
                courses &&
                courses.find((course) => slugify(course.name, { lower: true, locale: 'vi' }) === pathname.split('/')[4])
                  ?.name
              }`,
              href: `${PATH_DASHBOARD.courses.courseManage}/${pathname.split('/')[4]}`,
            },
            {
              name: 'Bài tập',
            },
          ]}
        />
        <AssignmentsNewForm lessonId={Number(id)} isEdit={(assignments && true) || false} assignments={assignments} />
      </Container>
    </Page>
  )
}
