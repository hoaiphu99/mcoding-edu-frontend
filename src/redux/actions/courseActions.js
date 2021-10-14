import { createActions } from 'redux-actions'

export const getAllCourses = createActions({
  getAllCoursesRequest: () => undefined,
  getAllCoursesSuccess: (payload) => payload,
  getAllCoursesFailure: (err) => err,
})

export const createCourse = createActions({
  createCourseRequest: (payload) => payload,
  createCourseSuccess: (payload) => payload,
  createCourseFailure: (err) => err,
})

export const getCourseDetails = createActions({
  getCourseDetailsRequest: (payload) => payload,
  getCourseDetailsSuccess: (payload) => payload,
  getCourseDetailsFailure: (err) => err,
})

export const getCourseLearning = createActions({
  getCourseLearningRequest: (payload) => payload,
  getCourseLearningSuccess: (payload) => payload,
  getCourseLearningFailure: (err) => err,
})
