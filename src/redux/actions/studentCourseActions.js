import { createActions } from 'redux-actions'

export const getStudentCourseByCourseID = createActions({
  getStudentCourseByCourseIDRequest: (payload) => payload,
  getStudentCourseByCourseIDSuccess: (payload) => payload,
  getStudentCourseByCourseIDFailure: (err) => err,
})

export const registerStudentCourse = createActions({
  registerStudentCourseRequest: (payload) => payload,
  registerStudentCourseSuccess: (payload) => payload,
  registerStudentCourseFailure: (err) => err,
})
