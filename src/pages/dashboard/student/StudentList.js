import { filter } from 'lodash'
// import { Icon } from '@iconify/react'
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import plusFill from '@iconify/icons-eva/plus-fill'
// import { Link as RouterLink } from 'react-router-dom'
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  // Button,
  // Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// components
import Page from '../../../components/Page'
import Label from '../../../components/Label'
import Scrollbar from '../../../components/Scrollbar'
import SearchNotFound from '../../../components/SearchNotFound'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import { UserListHead, UserListToolbar } from '../../../components/_dashboard/user/user-list'
import { StudentMoreMenu } from '../../../components/_dashboard/student/student-list'
//
import { getStudentList, bannedStudent } from '../../../redux/actions'
import { studentsState$ } from '../../../redux/selectors'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'student_id', label: 'Mã học viên', alignRight: false },
  { id: 'name', label: 'Họ tên', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'is_banned', label: 'Trạng thái', alignRight: false },
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

export default function StudentList() {
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const dispatch = useDispatch()
  const { data: StudentList } = useSelector(studentsState$)

  useEffect(() => {
    dispatch(getStudentList.getStudentListRequest())
  }, [dispatch])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = StudentList.map((n) => n.student_id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  // const handleClick = (event, student_id) => {
  //   const selectedIndex = selected.indexOf(student_id)
  //   let newSelected = []
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, student_id)
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

  const handleBannedUser = (student_id, isBanned) => {
    const data = {
      student_id,
      isBanned: !isBanned,
    }

    dispatch(bannedStudent.bannedStudentRequest({ data }))
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - StudentList.length) : 0

  const filteredUsers = applySortFilter(StudentList, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredUsers.length === 0

  return (
    <Page title="Danh sách học viên">
      <Container>
        <HeaderBreadcrumbs
          heading="Danh sách học viên"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Học viên',
              href: PATH_DASHBOARD.students.root,
            },
            { name: 'Danh sách học viên' },
          ]}
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
                  rowCount={StudentList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { student_id, name, is_banned, email, phone, avatar_url } = row
                    const isItemSelected = selected.indexOf(student_id) !== -1

                    return (
                      <TableRow
                        hover
                        key={student_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, student_id)} />
                        </TableCell> */}
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatar_url} />
                            <Typography variant="subtitle2" noWrap>
                              {student_id}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(is_banned && 'error') || 'success'}>
                            {is_banned ? 'Banned' : 'Active'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <StudentMoreMenu
                            onBanned={() => handleBannedUser(student_id, is_banned)}
                            isBanned={is_banned}
                            studentId={student_id}
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
            count={StudentList.length}
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
