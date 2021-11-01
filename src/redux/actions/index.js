export const getType = (reduxAction) => reduxAction.type

export { getUsers, registerUser, authUser, getUserProfile } from './userActions'
export {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseStatus,
  getCourseDetails,
  getCourseLesson,
  createSection,
  updateSection,
  deleteSection,
  createLesson,
  updateLesson,
  deleteLesson,
  getMyCourses,
  getStudentsInCourse,
  deleteStudentInCourse,
} from './courseActions'
export { getStudentCourseByCourseID, registerStudentCourse } from './studentCourseActions'
export { getCommentsByLessonID, createNewComment } from './commentActions'
export { getReviewsByCourseID, createNewReview } from './reviewActions'
