import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { Link as ScrollLink } from 'react-scroll'
import edit2Fill from '@iconify/icons-eva/edit-2-fill'
// material
import { styled } from '@mui/material/styles'
import { Grid, Rating, Button, Typography } from '@mui/material'
// utils
import { fShortenNumber } from '../../../utils/formatNumber'
// hooks
import useAuth from '../../../hooks/useAuth'

// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`,
    },
  },
}))

// ----------------------------------------------------------------------

CourseReviewOverview.propTypes = {
  review: PropTypes.object,
  onOpen: PropTypes.func,
  studentCourse: PropTypes.object,
  // courseId: PropTypes.number,
}

export default function CourseReviewOverview({ review, onOpen, studentCourse }) {
  const { isAuthenticated, user } = useAuth()
  const { count: totalReview, reviews } = review

  const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0) / totalReview || 0

  return (
    <Grid container>
      <GridStyle item xs={12} md={6}>
        <Typography variant="subtitle1" gutterBottom>
          Đánh giá
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
          {Math.round(totalRating)}/5
        </Typography>
        <RatingStyle readOnly value={Math.round(totalRating)} precision={0.1} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(totalReview)}
          &nbsp;đánh giá)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={6}>
        {isAuthenticated && user?.student_id === studentCourse?.student_id && user?.student_id ? (
          <ScrollLink to="move_add_review" spy smooth offset={-200}>
            <Button size="large" onClick={onOpen} variant="outlined" startIcon={<Icon icon={edit2Fill} />}>
              Để lại đánh giá của bạn
            </Button>
          </ScrollLink>
        ) : (
          <Typography variant="h5" gutterBottom sx={{ color: 'error.main' }}>
            {(!user?.student_id && 'Mục này dành cho học viên') || (!studentCourse && 'Bạn chưa tham gia khóa học này')}
          </Typography>
        )}
      </GridStyle>
    </Grid>
  )
}
