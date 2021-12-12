export const getType = (reduxAction) => reduxAction.type

export {
  getUsers,
  registerUser,
  authUser,
  getUserProfile,
  bannedUser,
  editUserStatus,
  changeUserPassword,
} from './userActions'
export { getStudentList, bannedStudent } from './studentActions'
export {
  getAllCourses,
  getAllCoursesPublic,
  getAllCoursesByCategoryId,
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
export { getStudentCourseByStudentAndCourseId, registerStudentCourse } from './studentCourseActions'
export { getCommentsByLessonID, createNewComment } from './commentActions'
export { getReviewsByCourseID, createNewReview } from './reviewActions'
export { getCategories, createCategory, updateCategory, deleteCategory } from './categoryActions'
export { getPrograming } from './programingActions'
export { getAttachmentsByLessonId, createAttachment, deleteAttachment } from './attachmentActions'
export { getAssignmentsByLessonId, createAssignments, updateAssignments, deleteAssignments } from './assignmentsActions'
export {
  getCourseTotal,
  getUserTotal,
  getStudentTotal,
  getStudentInCourseAnalytics,
  getStudentsAttendedCourseAnalytics,
} from './analyticsActions'
