import { combineReducers } from 'redux'
import { userReducers, userProfileReducers } from './users'
import { studentReducers } from './students'
import {
  coursesReducers,
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
import { programLanguagesReducers } from './programLanguages'
import { attachmentReducers } from './attachments'
import { analyticsReducers } from './analytics'

export default combineReducers({
  users: userReducers,
  students: studentReducers,
  // userLogin: userLoginReducers,
  userProfile: userProfileReducers,
  courses: coursesReducers,
  courseDetails: courseDetailsReducers,
  courseLesson: courseLessonReducers,
  studentCourse: studentCourseReducer,
  comments: commentsReducers,
  reviews: reviewsReducers,
  coursesMy: myCoursesReducers,
  studentsInCourse: studentsInCourseReducers,
  categories: categoriesReducers,
  programLanguages: programLanguagesReducers,
  attachments: attachmentReducers,
  lessonDetails: lessonDetailsReducers,
  analytics: analyticsReducers,
})
