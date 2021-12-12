import { INIT_STATE } from '../initialState'
import { getType, getStudentCourseByStudentAndCourseId, registerStudentCourse } from '../actions'

export const studentCourseReducer = (state = INIT_STATE.studentCourse, action) => {
  switch (action.type) {
    case getType(getStudentCourseByStudentAndCourseId.getStudentCourseByStudentAndCourseIdRequest()):
      return {
        ...state,
        success: false,
        loading: true,
        error: null,
      }
    case getType(getStudentCourseByStudentAndCourseId.getStudentCourseByStudentAndCourseIdSuccess()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case getType(getStudentCourseByStudentAndCourseId.getStudentCourseByStudentAndCourseIdFailure()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(registerStudentCourse.registerStudentCourseRequest()):
      return {
        ...state,
        success: false,
        loading: true,
        error: null,
      }
    case getType(registerStudentCourse.registerStudentCourseSuccess()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case getType(registerStudentCourse.registerStudentCourseFailure()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}
