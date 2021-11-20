import PropTypes from 'prop-types'

// material
import { Box, List, Rating, Avatar, ListItem, Typography } from '@mui/material'
// utils
import { fDate } from '../../../utils/formatTime'

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  review: PropTypes.object,
}

function ReviewItem({ review }) {
  const {
    student: { name, avatar_url: avatarUrl },
    details: comment,
    rating,
    created_at: postedAt,
  } = review

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 5,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' },
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(postedAt)}
            </Typography>
          </div>
        </Box>

        <div>
          <Rating size="small" value={rating} precision={0.1} readOnly />

          <Typography variant="body2">{comment}</Typography>
        </div>
      </ListItem>
    </>
  )
}

CourseReviewList.propTypes = {
  review: PropTypes.object,
}

export default function CourseReviewList({ review }) {
  const { reviews } = review

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {reviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))}
      </List>
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Box> */}
    </Box>
  )
}
