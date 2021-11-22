import { useState, useEffect } from 'react'
// material
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Typography,
} from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getStudentInCourseAnalytics, getStudentsAttendedCourseAnalytics } from '../../redux/actions'
import { analyticsState$ } from '../../redux/selectors'
// components
import Page from '../../components/Page'
import { PickerYear, PickerMonthYear, PickerQuarterYear } from '../../components/picker'
import { ChartColumnSingle, ChartBar } from '../../components/charts'
// utils
import { fMonthYear, fYear } from '../../utils/formatTime'

// ----------------------------------------------------------------------

export default function ChartAnalytics() {
  const [type, setType] = useState('month')

  const dispatch = useDispatch()
  const { data: analytics } = useSelector(analyticsState$)

  useEffect(() => {
    dispatch(getStudentInCourseAnalytics.getStudentInCourseAnalyticsRequest())
    if (type === 'month') {
      const dateFormat = fMonthYear(new Date())
      const query = `year=${dateFormat.split(' ')[1]}&&month=${dateFormat.split(' ')[0]}`
      dispatch(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsRequest({ query }))
    }
    if (type === 'quarter') {
      const dateFormat = fYear(new Date())
      const query = `year=${dateFormat}&&quarter=1`
      dispatch(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsRequest({ query }))
    }
    if (type === 'year') {
      const dateFormat = fYear(new Date())
      const query = `year=${dateFormat}`
      dispatch(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsRequest({ query }))
    }
  }, [dispatch, type])

  const handleChangeType = (event, newType) => {
    setType(newType)
  }

  const handleChangeDate = (value) => {
    if (type === 'month') {
      const query = `year=${value.split(' ')[1]}&&month=${value.split(' ')[0]}`
      dispatch(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsRequest({ query }))
    }
    if (type === 'quarter') {
      const query = `year=${value.year}&&quarter=${value.quarter}`
      dispatch(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsRequest({ query }))
    }
    if (type === 'year') {
      const query = `year=${value}`
      dispatch(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsRequest({ query }))
    }
  }

  return (
    <Page title="Biểu đồ thống kê">
      <Container>
        <Typography variant="h4">Thống kê</Typography>
        <Card sx={{ mb: 2 }}>
          <CardHeader title="10 khóa học được nhiều học viên tham gia" />
          <CardContent>
            <ChartColumnSingle data={analytics.studentInCourse} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Thống kê số lượng học viên tham gia khóa học" />
          <CardContent>
            <Stack spacing={3} direction="column">
              <ToggleButtonGroup value={type} exclusive onChange={handleChangeType}>
                <ToggleButton value="month">Tháng</ToggleButton>
                <ToggleButton value="quarter">Quý</ToggleButton>
                <ToggleButton value="year">Năm</ToggleButton>
              </ToggleButtonGroup>
              {type === 'month' && <PickerMonthYear onHandleChange={handleChangeDate} />}
              {type === 'quarter' && <PickerQuarterYear onHandleChange={handleChangeDate} />}
              {type === 'year' && <PickerYear onHandleChange={handleChangeDate} />}
            </Stack>
            <ChartBar data={analytics.studentsAttendedCourse} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}
