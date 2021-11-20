import { getType, getProgramLanguages } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const programLanguagesReducers = (state = INIT_STATE.programLanguages, action) => {
  switch (action.type) {
    case getType(getProgramLanguages.getProgramLanguagesRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getProgramLanguages.getProgramLanguagesSuccess()):
      return {
        ...state,
        loading: false,
        success: SUCCESS_ACTION_TYPE.LOAD,
        data: action.payload.data,
      }
    case getType(getProgramLanguages.getProgramLanguagesFailure()):
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
