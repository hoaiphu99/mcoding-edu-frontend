import { filter } from 'lodash'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
// import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import plusFill from '@iconify/icons-eva/plus-fill'
import { Link as RouterLink } from 'react-router-dom'
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  // Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material'
// hook
import useAuth from '../../../hooks/useAuth'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// components
import Page from '../../../components/Page'
import Label from '../../../components/Label'
import Scrollbar from '../../../components/Scrollbar'
import SearchNotFound from '../../../components/SearchNotFound'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../components/_dashboard/user/user-list'
//
import { getUsers, bannedUser, editUserStatus } from '../../../redux/actions'
import { usersState$ } from '../../../redux/selectors'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Tên người dùng', alignRight: false },
  { id: 'name', label: 'Họ tên', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'role_id', label: 'Quyền', alignRight: false },
  { id: 'status_code', label: 'Trạng thái', alignRight: false },
  { id: 'action', label: '', alignRight: true },
  { id: '' },
]

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0])
}

export default function UserList() {
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // const { enqueueSnackbar } = useSnackbar()

  const { user } = useAuth()

  const dispatch = useDispatch()
  const { data: userList } = useSelector(usersState$)

  useEffect(() => {
    dispatch(getUsers.getUsersRequest())
  }, [dispatch])

  // useEffect(() => {
  //   if (success === 'update') {
  //     enqueueSnackbar('Đã gửi mail thông báo tới người dùng', { variant: 'success' })
  //     dispatch({
  //       type: 'RESET_STATE',
  //     })
  //   }
  // }, [dispatch, success, enqueueSnackbar])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.username)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  // const handleClick = (event, username) => {
  //   const selectedIndex = selected.indexOf(username)
  //   let newSelected = []
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, username)
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1))
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1))
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
  //   }
  //   setSelected(newSelected)
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value)
  }

  const handleBannedUser = (username, status_code) => {
    const data = {
      username,
      isBanned: status_code === 'VER' ? 'BAN' : 'VER',
    }

    dispatch(bannedUser.bannedUserRequest({ data }))
  }

  const handleChangeStatus = (username, status_code) => {
    const data = {
      username,
      status: status_code,
    }

    dispatch(editUserStatus.editUserStatusRequest({ data }))
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredUsers.length === 0

  return (
    <Page title="Danh sách người dùng">
      <Container>
        <HeaderBreadcrumbs
          heading="Danh sách người dùng"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Người dùng',
              href: PATH_DASHBOARD.users.root,
            },
            { name: 'Danh sách người dùng' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.users.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              Thêm mới
            </Button>
          }
        />

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { username, name, status_code, role_id, email, phone, avatar_url } = row
                    const isItemSelected = selected.indexOf(username) !== -1

                    return (
                      <TableRow
                        hover
                        key={username}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, username)} />
                        </TableCell> */}
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={username} src={avatar_url} />
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(role_id === 1 && 'secondary') || 'success'}>
                            {role_id === 1 ? 'Admin' : 'Teachable'}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={
                              (status_code === 'BAN' && 'error') ||
                              (status_code === 'VER' && 'success') ||
                              (status_code === 'REJ' && 'default') ||
                              'warning'
                            }
                          >
                            {(status_code === 'BAN' && 'Banned') ||
                              (status_code === 'VER' && 'Active') ||
                              (status_code === 'REJ' && 'Rejected') ||
                              'Verifying'}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          {status_code === 'PEN' && user.role_id === 1 && (
                            <>
                              <Button
                                onClick={() => handleChangeStatus(username, 'VER')}
                                sx={{ mr: 1 }}
                                variant="contained"
                              >
                                {status_code === 'PEN' && 'Duyệt'}
                              </Button>
                              <Button onClick={() => handleChangeStatus(username, 'REJ')} variant="outlined">
                                {status_code === 'PEN' && 'Từ chối'}
                              </Button>
                            </>
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu
                            onBanned={() => handleBannedUser(username, status_code)}
                            statusCode={status_code}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  )
}
