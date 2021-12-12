import { getType, getCommentsByLessonID, createNewComment } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const commentsReducers = (state = INIT_STATE.comments, action) => {
  switch (action.type) {
    case getType(getCommentsByLessonID.getCommentsByLessonIDRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getCommentsByLessonID.getCommentsByLessonIDSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case getType(getCommentsByLessonID.getCommentsByLessonIDFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(createNewComment.createNewCommentRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(createNewComment.createNewCommentSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.CREATE,
        loading: false,
        error: null,
        data: [action.payload.data, ...state.data],
      }
    case getType(createNewComment.createNewCommentFailure()):
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
