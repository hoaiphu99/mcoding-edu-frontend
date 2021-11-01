import { createActions } from 'redux-actions'

// ----------------------------------------

// @desc    Get all reviews by CourseID
export const getReviewsByCourseID = createActions({
  getReviewsByCourseIDRequest: (payload) => payload,
  getReviewsByCourseIDSuccess: (payload) => payload,
  getReviewsByCourseIDFailure: (err) => err,
})

// @desc    Create review
export const createNewReview = createActions({
  createNewReviewRequest: (payload) => payload,
  createNewReviewSuccess: (payload) => payload,
  createNewReviewFailure: (err) => err,
})
