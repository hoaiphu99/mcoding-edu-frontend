import { getType, getPrograming } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const programingReducers = (state = INIT_STATE.programing, action) => {
  switch (action.type) {
    case getType(getPrograming.getProgramingRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getPrograming.getProgramingSuccess()):
      return {
        ...state,
        loading: false,
        success: SUCCESS_ACTION_TYPE.LOAD,
        data: action.payload.data,
      }
    case getType(getPrograming.getProgramingFailure()):
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}
