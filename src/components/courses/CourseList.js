import PropTypes from 'prop-types'
// material
import { Grid } from '@mui/material'
import ShopCourseCard from './CourseCard'

// ----------------------------------------------------------------------

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default function CourseList({ courses, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {courses.map((course) => {
        if (course.status_code)
          return (
            <Grid key={course.course_id} item xs={12} sm={6} md={3}>
              <ShopCourseCard course={course} />
            </Grid>
          )
        return null
      })}
    </Grid>
  )
}
