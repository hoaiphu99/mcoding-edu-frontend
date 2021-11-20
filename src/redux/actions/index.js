export const getType = (reduxAction) => reduxAction.type

export { getUsers, registerUser, authUser, getUserProfile, bannedUser } from './userActions'
export { getStudentList, bannedStudent } from './studentActions'
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
  getLessonById,
} from './courseActions'
export { getStudentCourseByCourseID, registerStudentCourse } from './studentCourseActions'
export { getCommentsByLessonID, createNewComment } from './commentActions'
export { getReviewsByCourseID, createNewReview } from './reviewActions'
export { getCategories } from './categoryActions'
export { getProgramLanguages } from './programLanguagesActions'
export { getAttachmentsByLessonId, createAttachment, deleteAttachment } from './attachmentActions'
export { getCourseTotal, getUserTotal, getStudentTotal, getStudentInCourseAnalytics } from './analyticsActions'
