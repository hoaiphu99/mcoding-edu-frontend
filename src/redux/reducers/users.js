import { INIT_STATE } from '../initialState'
import { getType, getUsers, authUser } from '../actions'

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
        error: action.payload.error.message,
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
        error: action.payload.error.message,
      }
    case getType(authUser.authUserLogout()):
      localStorage.removeItem('userInfo')
      return {
        loading: false,
        data: null,
        error: null,
      }
    default:
      return state
  }
}
