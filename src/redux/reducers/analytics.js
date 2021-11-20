import { getType, getCourseTotal, getUserTotal, getStudentTotal, getStudentInCourseAnalytics } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const analyticsReducers = (state = INIT_STATE.analytics, action) => {
  switch (action.type) {
    case getType(getStudentInCourseAnalytics.getStudentInCourseAnalyticsRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getStudentInCourseAnalytics.getStudentInCourseAnalyticsSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: { ...state.data, studentInCourse: action.payload.data },
        error: null,
      }
    case getType(getStudentInCourseAnalytics.getStudentInCourseAnalyticsFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Course total
    case getType(getCourseTotal.getCourseTotalRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getCourseTotal.getCourseTotalSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: { ...state.data, courseTotal: action.payload.data },
        error: null,
      }
    case getType(getCourseTotal.getCourseTotalFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // user total
    case getType(getUserTotal.getUserTotalRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getUserTotal.getUserTotalSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: { ...state.data, userTotal: action.payload.data },
        error: null,
      }
    case getType(getUserTotal.getUserTotalFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // student total
    case getType(getStudentTotal.getStudentTotalRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getStudentTotal.getStudentTotalSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: { ...state.data, studentTotal: action.payload.data },
        error: null,
      }
    case getType(getStudentTotal.getStudentTotalFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }

    case 'RESET_STATE':
      return {
        ...state,
        success: null,
      }
    default:
      return state
  }
}
