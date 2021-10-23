export const getType = (reduxAction) => reduxAction.type

export { getUsers, registerUser, authUser } from './userActions'
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
} from './courseActions'
export { getStudentCourseByCourseID } from './studentCourseActions'
