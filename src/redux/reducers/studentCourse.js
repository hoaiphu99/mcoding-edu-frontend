import { INIT_STATE } from '../initialState'
import { getType, getStudentCourseByCourseID } from '../actions'

export const studentCourseReducer = (state = INIT_STATE.studentCourse, action) => {
  switch (action.type) {
    case getType(getStudentCourseByCourseID.getStudentCourseByCourseIDRequest()):
      return {
        ...state,
        success: false,
        loading: true,
        error: null,
      }
    case getType(getStudentCourseByCourseID.getStudentCourseByCourseIDSuccess()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case getType(getStudentCourseByCourseID.getStudentCourseByCourseIDFailure()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
