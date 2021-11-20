import { useEffect } from 'react'
// material
import { Box, Grid, Container, Typography } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getCourseTotal, getUserTotal, getStudentTotal } from '../../redux/actions'
import { analyticsState$ } from '../../redux/selectors'
// components
import Page from '../../components/Page'
import { TeachableTotal, StudentTotal, CourseTotal } from '../../components/_dashboard/app'

// ----------------------------------------------------------------------

export default function GeneraAnalytics() {
  const dispatch = useDispatch()
  const {
    data: { courseTotal, userTotal, studentTotal },
  } = useSelector(analyticsState$)

  useEffect(() => {
    dispatch(getCourseTotal.getCourseTotalRequest())
    dispatch(getUserTotal.getUserTotalRequest())
    dispatch(getStudentTotal.getStudentTotalRequest())
  }, [dispatch])

  return (
    <Page title="Bảng điều khiển">
      <Container>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Chào mừng trở lại</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CourseTotal courseTotal={courseTotal} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TeachableTotal userTotal={userTotal} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StudentTotal studentTotal={studentTotal} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}
