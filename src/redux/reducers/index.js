import { combineReducers } from 'redux'
import { userReducers, userLoginReducers } from './users'
import { coursesReducers, courseDetailsReducers, courseLessonReducers } from './courses'
import { studentCourseReducer } from './studentCourse'

export default combineReducers({
  users: userReducers,
  userLogin: userLoginReducers,
  courses: coursesReducers,
  courseDetails: courseDetailsReducers,
  courseLesson: courseLessonReducers,
  studentCourse: studentCourseReducer,
})
