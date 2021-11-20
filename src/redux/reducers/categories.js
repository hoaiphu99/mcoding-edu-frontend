import { getType, getCategories } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const categoriesReducers = (state = INIT_STATE.categories, action) => {
  switch (action.type) {
    case getType(getCategories.getCategoriesRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getCategories.getCategoriesSuccess()):
      return {
        ...state,
        loading: false,
        success: SUCCESS_ACTION_TYPE.LOAD,
        data: action.payload.data,
      }
    case getType(getCategories.getCategoriesFailure()):
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
