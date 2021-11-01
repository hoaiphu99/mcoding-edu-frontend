import { combineReducers } from 'redux'
import { userReducers, userLoginReducers, userProfileReducers } from './users'
import {
  coursesReducers,
  courseDetailsReducers,
  courseLessonReducers,
  myCoursesReducers,
  studentsInCourseReducers,
} from './courses'
import { studentCourseReducer } from './studentCourse'
import { commentsReducers } from './comments'
import { reviewsReducers } from './reviews'

export default combineReducers({
  users: userReducers,
  userLogin: userLoginReducers,
  userProfile: userProfileReducers,
  courses: coursesReducers,
  courseDetails: courseDetailsReducers,
  courseLesson: courseLessonReducers,
  studentCourse: studentCourseReducer,
  comments: commentsReducers,
  reviews: reviewsReducers,
  coursesMy: myCoursesReducers,
  studentsInCourse: studentsInCourseReducers,
})
