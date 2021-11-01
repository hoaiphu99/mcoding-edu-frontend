import PropTypes from 'prop-types'
import { useState } from 'react'
// material
import { Divider, Collapse } from '@mui/material'
//
import CourseReviewForm from './CourseReviewForm'
import CourseReviewList from './CourseReviewList'
import CourseReviewOverview from './CourseReviewOverview'

// ----------------------------------------------------------------------

CourseReview.propTypes = {
  review: PropTypes.object,
  courseId: PropTypes.number.isRequired,
}

export default function CourseReview({ review, courseId }) {
  const [reviewBox, setReviewBox] = useState(false)

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev)
  }

  const handleCloseReviewBox = () => {
    setReviewBox(false)
  }

  return (
    <>
      <CourseReviewOverview review={review} courseId={courseId} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <CourseReviewForm onClose={handleCloseReviewBox} courseId={courseId} id="move_add_review" />
        <Divider />
      </Collapse>

      <CourseReviewList review={review} />
    </>
  )
}
