import { getType, getAssignmentsByLessonId, createAssignments, updateAssignments, deleteAssignments } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const assignmentsReducers = (state = INIT_STATE.assignments, action) => {
  switch (action.type) {
    // Get Assignments by lessonId
    case getType(getAssignmentsByLessonId.getAssignmentsByLessonIdRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getAssignmentsByLessonId.getAssignmentsByLessonIdSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getAssignmentsByLessonId.getAssignmentsByLessonIdFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Create Assignments
    case getType(createAssignments.createAssignmentsRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(createAssignments.createAssignmentsSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.CREATE,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(createAssignments.createAssignmentsFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Update Assignments
    case getType(updateAssignments.updateAssignmentsRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(updateAssignments.updateAssignmentsSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.UPDATE,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(updateAssignments.updateAssignmentsFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Delete Assignments
    case getType(deleteAssignments.deleteAssignmentsRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(deleteAssignments.deleteAssignmentsSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.DELETE,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(deleteAssignments.deleteAssignmentsFailure()):
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
