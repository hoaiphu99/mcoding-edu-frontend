import { createActions } from 'redux-actions'

export const getAllCourses = createActions({
  getAllCoursesRequest: (payload) => payload,
  getAllCoursesSuccess: (payload) => payload,
  getAllCoursesFailure: (err) => err,
})

export const getAllCoursesByCategoryId = createActions({
  getAllCoursesByCategoryIdRequest: (payload) => payload,
  getAllCoursesByCategoryIdSuccess: (payload) => payload,
  getAllCoursesByCategoryIdFailure: (err) => err,
})

export const getAllCoursesPublic = createActions({
  getAllCoursesPublicRequest: (payload) => payload,
  getAllCoursesPublicSuccess: (payload) => payload,
  getAllCoursesPublicFailure: (err) => err,
})

export const createCourse = createActions({
  createCourseRequest: (payload) => payload,
  createCourseSuccess: (payload) => payload,
  createCourseFailure: (err) => err,
})

export const updateCourse = createActions({
  updateCourseRequest: (payload) => payload,
  updateCourseSuccess: (payload) => payload,
  updateCourseFailure: (err) => err,
})

export const deleteCourse = createActions({
  deleteCourseRequest: (payload) => payload,
  deleteCourseSuccess: (payload) => payload,
  deleteCourseFailure: (err) => err,
})

export const updateCourseStatus = createActions({
  updateCourseStatusRequest: (payload) => payload,
  updateCourseStatusSuccess: (payload) => payload,
  updateCourseStatusFailure: (err) => err,
})

export const getCourseDetails = createActions({
  getCourseDetailsRequest: (payload) => payload,
  getCourseDetailsSuccess: (payload) => payload,
  getCourseDetailsFailure: (err) => err,
})

export const getCourseLesson = createActions({
  getCourseLessonRequest: (payload) => payload,
  getCourseLessonSuccess: (payload) => payload,
  getCourseLessonFailure: (err) => err,
})

export const createSection = createActions({
  createSectionRequest: (payload) => payload,
  createSectionSuccess: (payload) => payload,
  createSectionFailure: (err) => err,
})

export const updateSection = createActions({
  updateSectionRequest: (payload) => payload,
  updateSectionSuccess: (payload) => payload,
  updateSectionFailure: (err) => err,
})

export const deleteSection = createActions({
  deleteSectionRequest: (payload) => payload,
  deleteSectionSuccess: (payload) => payload,
  deleteSectionFailure: (err) => err,
})

export const getLessonById = createActions({
  getLessonByIdRequest: (payload) => payload,
  getLessonByIdSuccess: (payload) => payload,
  getLessonByIdFailure: (err) => err,
})

export const createLesson = createActions({
  createLessonRequest: (payload) => payload,
  createLessonSuccess: (payload) => payload,
  createLessonFailure: (err) => err,
})

export const updateLesson = createActions({
  updateLessonRequest: (payload) => payload,
  updateLessonSuccess: (payload) => payload,
  updateLessonFailure: (err) => err,
})

export const deleteLesson = createActions({
  deleteLessonRequest: (payload) => payload,
  deleteLessonSuccess: (payload) => payload,
  deleteLessonFailure: (err) => err,
})

export const getMyCourses = createActions({
  getMyCoursesRequest: () => undefined,
  getMyCoursesSuccess: (payload) => payload,
  getMyCoursesFailure: (err) => err,
})

export const getStudentsInCourse = createActions({
  getStudentsInCourseRequest: (payload) => payload,
  getStudentsInCourseSuccess: (payload) => payload,
  getStudentsInCourseFailure: (err) => err,
})

export const deleteStudentInCourse = createActions({
  deleteStudentInCourseRequest: (payload) => payload,
  deleteStudentInCourseSuccess: (payload) => payload,
  deleteStudentInCourseFailure: (err) => err,
})
