import { createActions } from 'redux-actions'

export const getStudentInCourseAnalytics = createActions({
  getStudentInCourseAnalyticsRequest: () => undefined,
  getStudentInCourseAnalyticsSuccess: (payload) => payload,
  getStudentInCourseAnalyticsFailure: (err) => err,
})

export const getCourseTotal = createActions({
  getCourseTotalRequest: () => undefined,
  getCourseTotalSuccess: (payload) => payload,
  getCourseTotalFailure: (err) => err,
})

export const getUserTotal = createActions({
  getUserTotalRequest: () => undefined,
  getUserTotalSuccess: (payload) => payload,
  getUserTotalFailure: (err) => err,
})

export const getStudentTotal = createActions({
  getStudentTotalRequest: () => undefined,
  getStudentTotalSuccess: (payload) => payload,
  getStudentTotalFailure: (err) => err,
})

export const getStudentsAttendedCourseAnalytics = createActions({
  getStudentsAttendedCourseAnalyticsRequest: (payload) => payload,
  getStudentsAttendedCourseAnalyticsSuccess: (payload) => payload,
  getStudentsAttendedCourseAnalyticsFailure: (err) => err,
})
