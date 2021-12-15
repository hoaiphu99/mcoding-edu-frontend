import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// material
import { Container } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getStudentList } from '../../../redux/actions'
import { studentsState$ } from '../../../redux/selectors'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// hook
import useAuth from '../../../hooks/useAuth'
// components
import Page from '../../../components/Page'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import StudentNewForm from '../../../components/_dashboard/student/StudentNewForm'
// ----------------------------------------------------------------------

export default function StudentCreate() {
  const dispatch = useDispatch()

  const { user } = useAuth()

  const { studentId } = useParams()

  const { data: students } = useSelector(studentsState$)

  // const isEdit = pathname.includes('edit')
  const currentStudent = students.find((student) => student.student_id === Number(studentId))

  useEffect(() => {
    dispatch(getStudentList.getStudentListRequest())
  }, [dispatch])

  return (
    <Page title="M-Coding Edu">
      <Container>
        <HeaderBreadcrumbs
          heading="Thông tin học viên"
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            {
              name: `${user.role_id === 1 ? 'Học viên' : 'Khóa học'}`,
              href: user.role_id === 1 ? PATH_DASHBOARD.students.root : PATH_DASHBOARD.courses.root,
            },
            { name: studentId },
          ]}
        />

        <StudentNewForm currentStudent={currentStudent} />
      </Container>
    </Page>
  )
}
