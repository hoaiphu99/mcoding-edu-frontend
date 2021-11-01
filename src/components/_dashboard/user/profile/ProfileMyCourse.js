import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
// material
import { alpha, styled } from '@mui/material/styles'
import { Box, Grid, Card, IconButton, Typography, CardContent } from '@mui/material'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getMyCourses } from '../../../../redux/actions'
import { coursesMyState$ } from '../../../../redux/selectors'

// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  backdropFilter: 'blur(3px)',
  WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  borderBottomRightRadius: theme.shape.borderRadiusMd,
}))

const GalleryImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

CourseItem.propTypes = {
  course: PropTypes.object,
}

function CourseItem({ course }) {
  const navigate = useNavigate()
  const {
    image_url: imageUrl,
    name,
    student_course: { process },
    slug,
  } = course

  const handleClick = () => {
    navigate(`/${slug}`)
  }
  return (
    <Card sx={{ pt: '100%', cursor: 'pointer' }}>
      <GalleryImgStyle alt="gallery image" src={imageUrl} onClick={handleClick} />

      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            Tiến độ: {process}%
          </Typography>
        </div>
        <IconButton color="inherit">
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </IconButton>
      </CaptionStyle>
    </Card>
  )
}

export default function ProfileMyCourse() {
  const dispatch = useDispatch()
  const { data: courses } = useSelector(coursesMyState$)
  useEffect(() => {
    dispatch(getMyCourses.getMyCoursesRequest())
  }, [dispatch])
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Khóa học đang học
      </Typography>
      {courses && courses.length <= 0 ? (
        <Typography variant="body1" sx={{ opacity: 0.72 }}>
          Bạn chưa có khóa học nào
        </Typography>
      ) : (
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid key={course.course_id} item xs={12} sm={6} md={4}>
                <CourseItem course={course} />
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </Box>
  )
}
