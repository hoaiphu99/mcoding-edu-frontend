import { getType, getReviewsByCourseID, createNewReview } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const reviewsReducers = (state = INIT_STATE.reviews, action) => {
  switch (action.type) {
    case getType(getReviewsByCourseID.getReviewsByCourseIDRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getReviewsByCourseID.getReviewsByCourseIDSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case getType(getReviewsByCourseID.getReviewsByCourseIDFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error.message,
      }
    case getType(createNewReview.createNewReviewRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(createNewReview.createNewReviewSuccess()): {
      const newData = state.data
      newData.reviews.push(action.payload.data)
      newData.count += 1
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.CREATE,
        loading: false,
        error: null,
        data: newData,
      }
    }
    case getType(createNewReview.createNewReviewFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error.message,
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
