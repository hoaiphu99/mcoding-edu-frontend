import { createActions } from 'redux-actions'

export const getStudentCourseByStudentAndCourseId = createActions({
  getStudentCourseByStudentAndCourseIdRequest: (payload) => payload,
  getStudentCourseByStudentAndCourseIdSuccess: (payload) => payload,
  getStudentCourseByStudentAndCourseIdFailure: (err) => err,
})

export const registerStudentCourse = createActions({
  registerStudentCourseRequest: (payload) => payload,
  registerStudentCourseSuccess: (payload) => payload,
  registerStudentCourseFailure: (err) => err,
})
