import { getType, getCategories, createCategory, updateCategory, deleteCategory } from '../actions'
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
    // create
    case getType(createCategory.createCategoryRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(createCategory.createCategorySuccess()):
      return {
        ...state,
        loading: false,
        success: SUCCESS_ACTION_TYPE.CREATE,
        data: [action.payload.data, ...state.data],
      }
    case getType(createCategory.createCategoryFailure()):
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // update
    case getType(updateCategory.updateCategoryRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(updateCategory.updateCategorySuccess()):
      return {
        ...state,
        loading: false,
        success: SUCCESS_ACTION_TYPE.UPDATE,
        data: state.data.map((item) =>
          item.category_id === action.payload.data.category_id ? action.payload.data : item,
        ),
      }
    case getType(updateCategory.updateCategoryFailure()):
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // delete
    case getType(deleteCategory.deleteCategoryRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(deleteCategory.deleteCategorySuccess()):
      return {
        ...state,
        loading: false,
        success: SUCCESS_ACTION_TYPE.DELETE,
        data: state.data.filter((item) => item.category_id !== action.payload),
      }
    case getType(deleteCategory.deleteCategoryFailure()):
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
