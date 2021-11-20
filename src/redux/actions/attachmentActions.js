import { createActions } from 'redux-actions'

export const getAttachmentsByLessonId = createActions({
  getAttachmentsByLessonIdRequest: (payload) => payload,
  getAttachmentsByLessonIdSuccess: (payload) => payload,
  getAttachmentsByLessonIdFailure: (err) => err,
})

export const createAttachment = createActions({
  createAttachmentRequest: (payload) => payload,
  createAttachmentSuccess: (payload) => payload,
  createAttachmentFailure: (err) => err,
})

export const deleteAttachment = createActions({
  deleteAttachmentRequest: (payload) => payload,
  deleteAttachmentSuccess: (payload) => payload,
  deleteAttachmentFailure: (err) => err,
})
