import { INIT_STATE } from '../initialState'
import { getType, getUsers, authUser, registerUser, getUserProfile } from '../actions'

export function userReducers(state = INIT_STATE.users, action) {
  switch (action.type) {
    case getType(getUsers.getUsersRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getUsers.getUsersSuccess()):
      return {
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getUsers.getUsersFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}

export function userLoginReducers(state = INIT_STATE.userLogin, action) {
  switch (action.type) {
    case getType(authUser.authUserRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(authUser.authUserSuccess()):
      localStorage.setItem('userInfo', JSON.stringify(action.payload.data))
      return {
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(authUser.authUserFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(authUser.authUserLogout()):
      localStorage.removeItem('userInfo')
      return {
        loading: false,
        data: null,
        error: null,
      }
    // Register
    case getType(registerUser.registerUserRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(registerUser.registerUserSuccess()):
      localStorage.setItem('userInfo', JSON.stringify(action.payload.data))
      return {
        success: action.payload.success,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(registerUser.registerUserFailure()):
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

export const userProfileReducers = (state = INIT_STATE.userProfile, action) => {
  switch (action.type) {
    case getType(getUserProfile.getUserProfileRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getUserProfile.getUserProfileSuccess()):
      return {
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getUserProfile.getUserProfileFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}
