import { combineReducers } from 'redux'
import { userReducers, userProfileReducers } from './users'
import { studentReducers } from './students'
import {
  coursesReducers,
  coursesPublicReducers,
  courseDetailsReducers,
  courseLessonReducers,
  myCoursesReducers,
  studentsInCourseReducers,
  lessonDetailsReducers,
} from './courses'
import { studentCourseReducer } from './studentCourse'
import { commentsReducers } from './comments'
import { reviewsReducers } from './reviews'
import { categoriesReducers } from './categories'
import { programingReducers } from './programing'
import { attachmentReducers } from './attachments'
import { analyticsReducers } from './analytics'
import { assignmentsReducers } from './assignments'

export default combineReducers({
  users: userReducers,
  students: studentReducers,
  // userLogin: userLoginReducers,
  userProfile: userProfileReducers,
  courses: coursesReducers,
  coursesPublic: coursesPublicReducers,
  courseDetails: courseDetailsReducers,
  courseLesson: courseLessonReducers,
  studentCourse: studentCourseReducer,
  comments: commentsReducers,
  reviews: reviewsReducers,
  coursesMy: myCoursesReducers,
  studentsInCourse: studentsInCourseReducers,
  categories: categoriesReducers,
  programing: programingReducers,
  attachments: attachmentReducers,
  lessonDetails: lessonDetailsReducers,
  analytics: analyticsReducers,
  assignments: assignmentsReducers,
})
