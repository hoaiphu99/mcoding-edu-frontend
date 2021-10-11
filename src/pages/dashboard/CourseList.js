import { filter } from 'lodash'
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
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/actions'
import { coursesState$ } from '../../redux/selectors'
// utils
import { fDate } from '../../utils/formatTime'
// routes
import { PATH_DASHBOARD } from '../../routes/paths'
// components
import Page from '../../components/Page'
import Label from '../../components/Label'
import Scrollbar from '../../components/Scrollbar'
import SearchNotFound from '../../components/SearchNotFound'
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs'
import { CourseListHead, CourseListToolbar, CourseMoreMenu } from '../../components/_dashboard/course/course-list'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Khóa học', alignRight: false },
  { id: 'created_at', label: 'Đã tạo', alignRight: false },
  { id: 'status_code', label: 'Trạng thái', alignRight: false },
  { id: 'professor', label: 'Người tạo', alignRight: true },
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
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState('created_at')

  const { data: courses } = useSelector(coursesState$)

  useEffect(() => {
    dispatch(getAllCourses.getAllCoursesRequest())
  }, [dispatch])

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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

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

  const handleDeleteProduct = (courseId) => {
    console.log(courseId)
    // dispatch(deleteProduct(productId))
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0

  const filteredCourses = applySortFilter(courses, getComparator(order, orderBy), filterName)

  const isCourseNotFound = filteredCourses.length === 0

  return (
    <Page title="Danh sách khóa học">
      <Container>
        <HeaderBreadcrumbs
          heading="Danh sách khóa học"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Khóa học',
              href: PATH_DASHBOARD.courses.root,
            },
            { name: 'Danh sách khóa học' },
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
                  {filteredCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { course_id, name, image_url, professor, created_at, status_code, slug } = row

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
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
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
                        <TableCell style={{ minWidth: 160 }}>{fDate(created_at)}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          <Label
                            variant="ghost"
                            color={
                              (status_code === 'PEN' && 'warning') ||
                              (status_code === 'PUB' && 'success') ||
                              (status_code === 'APP' && 'primary') ||
                              (status_code === 'REF' && 'info') ||
                              'error'
                            }
                          >
                            {(status_code === 'PEN' && 'Chờ duyệt') ||
                              (status_code === 'PUB' && 'Công khai') ||
                              (status_code === 'APP' && 'Đã duyệt') ||
                              (status_code === 'REF' && 'Không được duyệt') ||
                              'Đã hủy'}
                          </Label>
                        </TableCell>
                        <TableCell align="right">{professor.username}</TableCell>
                        <TableCell align="right">
                          <CourseMoreMenu onDelete={() => handleDeleteProduct(course_id)} courseSlug={slug} />
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
            count={courses.length}
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
