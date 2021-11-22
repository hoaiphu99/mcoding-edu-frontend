import { createActions } from 'redux-actions'

export const getStudentCourseByStudentId = createActions({
  getStudentCourseByStudentIdRequest: (payload) => payload,
  getStudentCourseByStudentIdSuccess: (payload) => payload,
  getStudentCourseByStudentIdFailure: (err) => err,
})

export const registerStudentCourse = createActions({
  registerStudentCourseRequest: (payload) => payload,
  registerStudentCourseSuccess: (payload) => payload,
  registerStudentCourseFailure: (err) => err,
})
