import { createActions } from 'redux-actions'

export const getCommentsByLessonID = createActions({
  getCommentsByLessonIDRequest: (payload) => payload,
  getCommentsByLessonIDSuccess: (payload) => payload,
  getCommentsByLessonIDFailure: (err) => err,
})

export const createNewComment = createActions({
  createNewCommentRequest: (payload) => payload,
  createNewCommentSuccess: (payload) => payload,
  createNewCommentFailure: (err) => err,
})
