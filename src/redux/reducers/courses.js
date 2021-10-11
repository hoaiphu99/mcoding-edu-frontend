import { INIT_STATE } from '../initialState'
import { getType, getAllCourses, createCourse, getCourseDetails } from '../actions'

export const coursesReducers = (state = INIT_STATE.courses, action) => {
  switch (action.type) {
    case getType(getAllCourses.getAllCoursesRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getAllCourses.getAllCoursesSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getAllCourses.getAllCoursesFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error.message,
      }
    case getType(createCourse.createCourseRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(createCourse.createCourseSuccess()):
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
        error: null,
      }
    case getType(createCourse.createCourseFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error.message,
      }

    default:
      return state
  }
}

export const courseDetailsReducers = (state = INIT_STATE.courseDetails, action) => {
  switch (action.type) {
    case getType(getCourseDetails.getCourseDetailsRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getCourseDetails.getCourseDetailsSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getCourseDetails.getCourseDetailsFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error.message,
      }
    default:
      return state
  }
}
