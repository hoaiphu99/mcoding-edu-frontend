import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
// material
import { Container } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../redux/actions'
import { usersState$ } from '../../../redux/selectors'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// components
import Page from '../../../components/Page'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import UserNewForm from '../../../components/_dashboard/user/UserNewForm'

// ----------------------------------------------------------------------

export default function UserCreate() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { username } = useParams()
  const { data: users } = useSelector(usersState$)
  const isEdit = pathname.includes('edit')
  const currentUser = users.find((user) => user.username === username)

  useEffect(() => {
    dispatch(getUsers.getUsersRequest())
  }, [dispatch])

  return (
    <Page title="M-Coding Edu">
      <Container>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo người dùng mới' : 'Chỉnh sửa người dùng'}
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: 'Người dùng', href: PATH_DASHBOARD.users.root },
            { name: !isEdit ? 'Người dùng mới' : username },
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  )
}
