import { combineReducers } from 'redux'
import { userReducers, userLoginReducers } from './users'
import { coursesReducers, courseDetailsReducers, courseLearningReducers } from './courses'

export default combineReducers({
  users: userReducers,
  userLogin: userLoginReducers,
  courses: coursesReducers,
  courseDetails: courseDetailsReducers,
  courseLearning: courseLearningReducers,
})