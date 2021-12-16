import { useEffect, useState } from 'react'
// import { Icon } from '@iconify/react'
import { useSnackbar } from 'notistack'
// import { sentenceCase } from 'change-case'
import slugify from 'slugify'
import { useParams } from 'react-router-dom'
// import clockFill from '@iconify/icons-eva/clock-fill'
// import roundVerified from '@iconify/icons-ic/round-verified'
// import roundVerifiedUser from '@iconify/icons-ic/round-verified-user'
// material
// import { alpha, styled } from '@mui/material/styles'
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
// redux
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCourses,
  getCourseDetails,
  getStudentCourseByStudentAndCourseId,
  registerStudentCourse,
  getReviewsByCourseID,
} from '../redux/actions'
import { coursesState$, courseDetailsState$, studentCourseState$, reviewsState$ } from '../redux/selectors'
// hook
import useAuth from '../hooks/useAuth'
// routes
import { PATH_PAGE } from '../routes/paths'
// components
import Page from '../components/Page'
import Markdown from '../components/Markdown'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs'
import { CourseHero, CourseTeachableDetails, CourseLessonList, CourseReview } from '../components/course/course-details'

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={12} lg={12}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      <Skeleton variant="text" height={240} width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
  </Grid>
)

export default function CourseDetails() {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [value, setValue] = useState('1')

  const { user } = useAuth()

  const { data: courses } = useSelector(coursesState$)

  const { data: course, error, loading } = useSelector(courseDetailsState$)
  const { data: studentCourse } = useSelector(studentCourseState$)
  const { data: review } = useSelector(reviewsState$)
  const courseID = courses.find((item) => slugify(item.name, { lower: true, locale: 'vi' }) === slug)?.course_id

  useEffect(() => {
    if (!courses.length) {
      dispatch(getAllCourses.getAllCoursesRequest({ query: 'all=true' }))
    }

    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [dispatch, courses, error, enqueueSnackbar])

  useEffect(() => {
    if (course?.course_id !== courseID && courseID) {
      dispatch(getCourseDetails.getCourseDetailsRequest({ id: courseID }))
      if (user && user.student_id) {
        const data = {
          studentId: user.student_id,
          courseId: courseID,
        }
        dispatch(getStudentCourseByStudentAndCourseId.getStudentCourseByStudentAndCourseIdRequest({ data }))
      }
    }
  }, [dispatch, course, courseID, user])

  useEffect(() => {
    if (courseID) {
      dispatch(getReviewsByCourseID.getReviewsByCourseIDRequest({ id: courseID }))
    }
  }, [dispatch, courseID])

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  const onHandleClick = () => {
    const data = {
      studentId: user.student_id,
      courseId: course.course_id,
    }
    dispatch(registerStudentCourse.registerStudentCourseRequest({ data }))
  }

  return (
    <Page title={`${course && course.name}`}>
      <Container>
        {loading ? (
          SkeletonLoad
        ) : (
          <>
            <HeaderBreadcrumbs
              sx={{ mb: 5, mt: 15 }}
              heading={`${course && course.name}`}
              links={[
                { name: 'Trang chủ', href: '/' },
                { name: 'Khóa học', href: PATH_PAGE.courses },
                { name: `${course && course.name}` },
              ]}
            />

            {course && (
              <>
                <Card sx={{ mb: 2 }}>
                  <CourseHero course={course} studentCourse={studentCourse} onHandleClick={onHandleClick} />
                </Card>

                <Card sx={{ mb: 2, mt: 2 }}>
                  <TabContext value={value}>
                    <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                      <TabList onChange={handleChangeTab}>
                        <Tab disableRipple value="1" label="Thông tin khóa học" />
                        <Tab
                          disableRipple
                          value="2"
                          label="Danh sách bài học"
                          sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                        />
                        <Tab
                          disableFocusRipple
                          value="3"
                          label={`Đánh giá (${review?.count})`}
                          sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                        />
                      </TabList>
                    </Box>

                    <Divider />

                    <TabPanel value="1">
                      <Box sx={{ p: 3 }}>
                        <Markdown children={course.description} />
                      </Box>
                    </TabPanel>
                    <TabPanel value="2">
                      <Box>
                        <CourseLessonList course={course} />
                      </Box>
                    </TabPanel>
                    <TabPanel value="3">
                      <Box>
                        {review && (
                          <CourseReview review={review} courseId={course.course_id} studentCourse={studentCourse} />
                        )}
                      </Box>
                    </TabPanel>
                  </TabContext>
                </Card>
                <CourseTeachableDetails course={course} />
              </>
            )}

            {!course && SkeletonLoad}

            {error && <Typography variant="h6">404 Không tìm thấy khóa học</Typography>}
          </>
        )}
      </Container>
    </Page>
  )
}
