import { filter } from 'lodash'
import slugify from 'slugify'
import { useSnackbar } from 'notistack'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import plusFill from '@iconify/icons-eva/plus-fill'
import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  // Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, deleteCourse, updateCourseStatus, getCategories, getPrograming } from '../../../redux/actions'
import { coursesState$ } from '../../../redux/selectors'
// hook
import useAuth from '../../../hooks/useAuth'
// utils
import { fDate } from '../../../utils/formatTime'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// components
import Page from '../../../components/Page'
import Label from '../../../components/Label'
import Scrollbar from '../../../components/Scrollbar'
import SearchNotFound from '../../../components/SearchNotFound'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import { CourseListHead, CourseListToolbar, CourseMoreMenu } from '../../../components/_dashboard/course/course-list'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Khóa học', alignRight: false },
  { id: 'created_at', label: 'Đã tạo', alignRight: false },
  { id: 'teachable', label: 'Người tạo', alignRight: false },
  { id: 'status_code', label: 'Trạng thái', alignRight: false },
  { id: 'action' },
  { id: 'action1' },
  { id: '' },
]

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'image_url',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}))

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
    return filter(array, (_course) => _course.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }

  return stabilizedThis.map((el) => el[0])
}

// ----------------------------------------------------------------------

export default function CourseList() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('desc')
  const [selected, setSelected] = useState([])
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState('created_at')
  const [tag, setTag] = useState('')

  const { user: userLogin } = useAuth()

  const { enqueueSnackbar } = useSnackbar()

  const { data: courses, error, success, count } = useSelector(coursesState$)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
    if (tag === 'delete' && success) {
      enqueueSnackbar('Xóa khóa học thành công', { variant: 'success' })
      setTag('')
    } else if (tag === 'update' && success) {
      enqueueSnackbar('Cập nhật trạng thái thành công', { variant: 'success' })
      setTag('')
    }
    dispatch(getAllCourses.getAllCoursesRequest({ query: `rowsPerPage=${rowsPerPage}&&page=${page + 1}` }))

    dispatch(getCategories.getCategoriesRequest())
    dispatch(getPrograming.getProgramingRequest())
  }, [dispatch, error, enqueueSnackbar, tag, success, rowsPerPage, page])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = courses.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name)
  //   let newSelected = []
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name)
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

  const handleDeleteCourse = (courseId) => {
    console.log(courseId)
    dispatch(deleteCourse.deleteCourseRequest({ id: courseId }))
    setTag('delete')
  }

  const handleUpdateCourseStatus = (courseId, statusCode, rejected) => {
    const data = {
      id: courseId,
    }

    switch (statusCode) {
      case 'PEN':
        if (rejected) {
          data.status_code = 'REJ'
          break
        }
        data.status_code = 'APP'
        break
      case 'APP':
        data.status_code = 'PUB'
        break
      case 'PUB':
        data.status_code = 'CAN'
        break
      case 'REJ':
        data.status_code = 'APP'
        break
      case 'CAN':
        data.status_code = 'CAN'
        break
      default:
        data.status_code = 'PEN'
        break
    }
    dispatch(updateCourseStatus.updateCourseStatusRequest({ data }))
    setTag('update')
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0

  const filteredCourses = applySortFilter(
    courses.filter((course) => {
      if (userLogin.role_id !== 1) {
        return course.user.username === userLogin.username
      }
      return course
    }),
    getComparator(order, orderBy),
    filterName,
  )

  const isCourseNotFound = filteredCourses.length === 0

  return (
    <Page title="Danh sách khóa học">
      <Container>
        <HeaderBreadcrumbs
          heading={`Danh sách khóa học ${(userLogin.role_id !== 1 && 'của tôi') || ''}`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Khóa học',
              href: PATH_DASHBOARD.courses.root,
            },
            { name: `Danh sách khóa học ${userLogin.role_id !== 1 && 'của tôi'}` },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.courses.newCourse}
              startIcon={<Icon icon={plusFill} />}
            >
              Thêm mới
            </Button>
          }
        />

        <Card>
          <CourseListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CourseListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={courses.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCourses.map((row) => {
                    const { course_id, name, image_url, user, created_at, status_code } = row

                    const isItemSelected = selected.indexOf(name) !== -1

                    return (
                      <TableRow
                        hover
                        key={course_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell> */}
                        <TableCell component="th" scope="row" padding="none" style={{ maxWidth: 360 }}>
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <ThumbImgStyle alt={name} src={image_url} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell style={{ minWidth: 130 }}>{fDate(created_at)}</TableCell>
                        <TableCell align="right">{user.name}</TableCell>
                        <TableCell style={{ minWidth: 130 }}>
                          <Label
                            variant="ghost"
                            color={
                              (status_code === 'PEN' && 'warning') ||
                              (status_code === 'PUB' && 'success') ||
                              (status_code === 'APP' && 'primary') ||
                              (status_code === 'REJ' && 'info') ||
                              'error'
                            }
                          >
                            {(status_code === 'PEN' && 'Chờ duyệt') ||
                              (status_code === 'PUB' && 'Công khai') ||
                              (status_code === 'APP' && 'Đã duyệt') ||
                              (status_code === 'REJ' && 'Không được duyệt') ||
                              'Đã hủy'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          {status_code !== 'CAN' &&
                            status_code !== 'PUB' &&
                            status_code !== 'APP' &&
                            userLogin.role_id === 1 && (
                              <>
                                {status_code === 'PEN' && (
                                  <Button
                                    sx={{ mr: 1 }}
                                    variant="outlined"
                                    onClick={() => handleUpdateCourseStatus(course_id, status_code, true)}
                                  >
                                    Từ chối
                                  </Button>
                                )}
                                <Button
                                  variant="contained"
                                  onClick={() => handleUpdateCourseStatus(course_id, status_code)}
                                >
                                  {(status_code === 'PEN' && 'Duyệt') || (status_code === 'REJ' && 'Duyệt lại')}
                                </Button>
                              </>
                            )}
                          {user.username === userLogin.username && status_code === 'APP' && (
                            <Button
                              variant="contained"
                              onClick={() => handleUpdateCourseStatus(course_id, status_code)}
                            >
                              Đăng
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {status_code !== 'CAN' && (status_code !== 'PEN' || userLogin.role_id !== 1) && (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleUpdateCourseStatus(course_id, 'CAN')}
                            >
                              Hủy bỏ
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {status_code !== 'PEN' && (
                            <CourseMoreMenu
                              onDelete={() => handleDeleteCourse(course_id)}
                              courseSlug={slugify(name, { lower: true, locale: 'vi' })}
                              courseId={course_id}
                            />
                          )}
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
                {isCourseNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
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
            count={count}
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
