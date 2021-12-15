import { filter } from 'lodash'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
// import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import plusFill from '@iconify/icons-eva/plus-fill'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
// material
import {
  Card,
  Table,
  Button,
  // Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from '@mui/material'
// hook
import useAuth from '../../../hooks/useAuth'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// components
import Page from '../../../components/Page'
import Scrollbar from '../../../components/Scrollbar'
import SearchNotFound from '../../../components/SearchNotFound'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import { UserListHead, UserListToolbar } from '../../../components/_dashboard/user/user-list'
import { CategoryMoreMenu, CategoryNewForm } from '../../../components/_dashboard/category'
//
import { getCategories, deleteCategory } from '../../../redux/actions'
import { categoriesState$ } from '../../../redux/selectors'
// utils
import { fDate } from '../../../utils/formatTime'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Mã', alignRight: false },
  { id: 'name', label: 'Tên', alignRight: false },
  { id: 'description', label: 'Mô tả', alignRight: false },
  { id: 'updated_at', label: 'Ngày cập nhật', alignRight: false },
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
    return filter(array, (_category) => _category.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0])
}

export default function CategoryList() {
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('desc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('updated_at')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [categoryId, setCategoryId] = useState(null)

  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { user } = useAuth()

  const dispatch = useDispatch()
  const { data: categoryList, success } = useSelector(categoriesState$)

  useEffect(() => {
    if (!user || user?.role_id === 2) {
      navigate(PATH_DASHBOARD, { replace: true })
    }
    dispatch(getCategories.getCategoriesRequest())
  }, [dispatch, user, navigate])

  useEffect(() => {
    if (success === 'delete') {
      enqueueSnackbar('Xóa thành công', { variant: 'success' })
    }
  }, [success, enqueueSnackbar])

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
      const newSelecteds = categoryList.map((n) => n.category_id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
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

  const handleOpenForm = () => {
    setOpen(true)
  }

  const handleCloseForm = () => {
    setOpen(false)
    setIsEdit(false)
  }

  const handleEdit = (category_id) => {
    setCategoryId(category_id)
    setOpen(true)
    setIsEdit(true)
  }

  const handleDelete = (category_id) => {
    console.log('🚀 ~ file: CategoryList.js ~ line 166 ~ handleDelete ~ category_id', category_id)
    dispatch(deleteCategory.deleteCategoryRequest({ id: category_id }))
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryList.length) : 0

  const filteredCategories = applySortFilter(categoryList, getComparator(order, orderBy), filterName)

  const isCategoryNotFound = filteredCategories.length === 0

  return (
    <Page title="Danh sách danh mục">
      <Container>
        <HeaderBreadcrumbs
          heading="Danh sách danh mục"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Danh mục',
              href: PATH_DASHBOARD.categories.root,
            },
            { name: 'Danh sách danh mục' },
          ]}
          action={
            <Button
              variant="contained"
              onClick={handleOpenForm}
              to={PATH_DASHBOARD.categories.newCategory}
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
                  rowCount={categoryList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { category_id, name, description, updated_at } = row
                    const isItemSelected = selected.indexOf(category_id) !== -1

                    return (
                      <TableRow
                        hover
                        key={category_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell align="left">{category_id}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">{fDate(updated_at)}</TableCell>

                        <TableCell align="right">
                          <CategoryMoreMenu
                            onEdit={() => handleEdit(category_id)}
                            onDelete={() => handleDelete(category_id)}
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
                {isCategoryNotFound && (
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
            count={categoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <CategoryNewForm open={open} onClose={handleCloseForm} isEdit={isEdit} category_id={categoryId} />
    </Page>
  )
}
