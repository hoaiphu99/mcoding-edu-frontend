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
import { getStudentInCourseAnalytics } from '../../redux/actions'
import { analyticsState$ } from '../../redux/selectors'
// components
import Page from '../../components/Page'
import { PickerYear } from '../../components/picker'
import { ChartColumnSingle } from '../../components/charts'

// ----------------------------------------------------------------------

export default function ChartAnalytics() {
  const [type, setType] = useState('month')

  const dispatch = useDispatch()
  const { data: analytics } = useSelector(analyticsState$)

  useEffect(() => {
    dispatch(getStudentInCourseAnalytics.getStudentInCourseAnalyticsRequest())
  }, [dispatch])

  const handleChangeType = (event, newType) => {
    setType(newType)
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
          <CardHeader title="Thống kê số lượng học viên đăng ký theo tháng/quý/năm" />
          <CardContent>
            <Stack spacing={3} direction="column">
              <ToggleButtonGroup value={type} exclusive onChange={handleChangeType}>
                <ToggleButton value="month">Tháng</ToggleButton>
                <ToggleButton value="quarter">Quý</ToggleButton>
                <ToggleButton value="year">Năm</ToggleButton>
              </ToggleButtonGroup>
              <PickerYear />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}
