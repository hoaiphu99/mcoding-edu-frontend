import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'
import { getType, getUsers, getUserProfile, bannedUser, editUserStatus, changeUserPassword } from '../actions'

export function userReducers(state = INIT_STATE.users, action) {
  switch (action.type) {
    case getType(getUsers.getUsersRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getUsers.getUsersSuccess()):
      return {
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getUsers.getUsersFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(bannedUser.bannedUserRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(bannedUser.bannedUserSuccess()): {
      const newData = state.data.map((item) => {
        if (item.username === action.payload.data.username) {
          return action.payload.data
        }
        return item
      })
      return {
        success: SUCCESS_ACTION_TYPE.UPDATE,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(bannedUser.bannedUserFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // edit user status
    case getType(editUserStatus.editUserStatusRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(editUserStatus.editUserStatusSuccess()): {
      const newData = state.data.map((item) => {
        if (item.username === action.payload.data.username) {
          return action.payload.data
        }
        return item
      })
      return {
        success: SUCCESS_ACTION_TYPE.UPDATE,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(editUserStatus.editUserStatusFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }

    default:
      return state
  }
}

// export function userLoginReducers(state = INIT_STATE.userLogin, action) {
//   switch (action.type) {
//     case getType(authUser.authUserRequest()):
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       }
//     case getType(authUser.authUserSuccess()):
//       localStorage.setItem('userInfo', JSON.stringify(action.payload.data))
//       return {
//         loading: false,
//         data: action.payload.data,
//         error: null,
//       }
//     case getType(authUser.authUserFailure()):
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error ? action.payload.error.message : action.payload.message,
//       }
//     case getType(authUser.authUserLogout()):
//       localStorage.removeItem('userInfo')
//       return {
//         loading: false,
//         data: null,
//         error: null,
//       }
//     // Register
//     case getType(registerUser.registerUserRequest()):
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       }
//     case getType(registerUser.registerUserSuccess()):
//       localStorage.setItem('userInfo', JSON.stringify(action.payload.data))
//       return {
//         success: action.payload.success,
//         loading: false,
//         data: action.payload.data,
//         error: null,
//       }
//     case getType(registerUser.registerUserFailure()):
//       return {
//         ...state,
//         success: action.payload.success,
//         loading: false,
//         error: action.payload.error ? action.payload.error.message : action.payload.message,
//       }
//     default:
//       return state
//   }
// }

export const userProfileReducers = (state = INIT_STATE.userProfile, action) => {
  switch (action.type) {
    case getType(getUserProfile.getUserProfileRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getUserProfile.getUserProfileSuccess()):
      return {
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getUserProfile.getUserProfileFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // change password
    case getType(changeUserPassword.changeUserPasswordRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(changeUserPassword.changeUserPasswordSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.UPDATE,
        loading: false,
        error: null,
      }
    case getType(changeUserPassword.changeUserPasswordFailure()):
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
        error: null,
      }
    default:
      return state
  }
}
