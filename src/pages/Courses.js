// import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { filter, includes, orderBy } from 'lodash'
// material
import { Container, Typography } from '@mui/material'
// components
import Page from '../components/Page'
import { CourseList } from '../components/course/course-list'
// redux
import { coursesState$ } from '../redux/selectors'
import { getAllCourses } from '../redux/actions/courseActions'
// ----------------------------------------------------------------------

// function applyFilter(courses, sortBy, filters) {
//   // SORT BY
//   if (sortBy === 'featured') {
//     courses = orderBy(courses, ['sold'], ['desc'])
//   }
//   if (sortBy === 'newest') {
//     courses = orderBy(courses, ['createdAt'], ['desc'])
//   }
//   if (sortBy === 'priceDesc') {
//     courses = orderBy(courses, ['price'], ['desc'])
//   }
//   if (sortBy === 'priceAsc') {
//     courses = orderBy(courses, ['price'], ['asc'])
//   }
//   // FILTER PRODUCTS
//   if (filters.gender.length > 0) {
//     courses = filter(courses, (_product) => includes(filters.gender, _product.gender))
//   }
//   if (filters.category !== 'All') {
//     courses = filter(courses, (_product) => _product.category === filters.category)
//   }
//   if (filters.colors.length > 0) {
//     courses = filter(courses, (_product) => _product.colors.some((color) => filters.colors.includes(color)))
//   }
//   if (filters.priceRange) {
//     courses = filter(courses, (_product) => {
//       if (filters.priceRange === 'below') {
//         return _product.price < 25
//       }
//       if (filters.priceRange === 'between') {
//         return _product.price >= 25 && _product.price <= 75
//       }
//       return _product.price > 75
//     })
//   }
//   if (filters.rating) {
//     courses = filter(courses, (_product) => {
//       const convertRating = (value) => {
//         if (value === 'up4Star') return 4
//         if (value === 'up3Star') return 3
//         if (value === 'up2Star') return 2
//         return 1
//       }
//       return _product.totalRating > convertRating(filters.rating)
//     })
//   }
//   return courses
// }

export default function EcommerceShop() {
  const dispatch = useDispatch()
  const { data: courses } = useSelector(coursesState$)

  useEffect(() => {
    dispatch(getAllCourses.getAllCoursesRequest())
  }, [dispatch])
  // const [openFilter, setOpenFilter] = useState(false)
  // const { courses, sortBy, filters } = useSelector((state) => state.course)
  // const filteredProducts = applyFilter(courses, sortBy, filters)

  // const formik = useFormik({
  //   initialValues: {
  //     gender: filters.gender,
  //     category: filters.category,
  //     colors: filters.colors,
  //     priceRange: filters.priceRange,
  //     rating: filters.rating,
  //   },
  //   onSubmit: async (values, { setSubmitting }) => {
  //     try {
  //       // await fakeRequest(500)
  //       setSubmitting(false)
  //     } catch (error) {
  //       console.error(error)
  //       setSubmitting(false)
  //     }
  //   },
  // })

  // const { values, resetForm, handleSubmit, isSubmitting, initialValues } = formik

  // const isDefault =
  //   !values.priceRange &&
  //   !values.rating &&
  //   values.gender.length === 0 &&
  //   values.colors.length === 0 &&
  //   values.category === 'All'

  // useEffect(() => {
  //   dispatch(getProducts())
  // }, [dispatch])

  // useEffect(() => {
  //   dispatch(filterProducts(values))
  // }, [dispatch, values])

  // const handleOpenFilter = () => {
  //   setOpenFilter(true)
  // }

  // const handleCloseFilter = () => {
  //   setOpenFilter(false)
  // }

  // const handleResetFilter = () => {
  //   handleSubmit()
  //   resetForm()
  // }

  return (
    <Page title="Khóa học" id="move_top">
      <Container>
        <Typography variant="h4" sx={{ mb: 5, mt: 15 }}>
          DANH SÁCH KHÓA HỌC
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <CourseFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <CourseSort />
          </Stack>
        </Stack> */}

        <CourseList courses={courses} />
      </Container>
    </Page>
  )
}
