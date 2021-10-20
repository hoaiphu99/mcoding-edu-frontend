export const getType = (reduxAction) => reduxAction.type

export { getUsers, authUser } from './userActions'
export {
  getAllCourses,
  createCourse,
  getCourseDetails,
  getCourseLesson,
  createSection,
  updateSection,
  deleteSection,
  createLesson,
  updateLesson,
  deleteLesson,
} from './courseActions'
