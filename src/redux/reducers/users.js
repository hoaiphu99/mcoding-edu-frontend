import { INIT_STATE } from '../initialState'
import { getType, getUsers } from '../actions'

export default function userReducers(state = INIT_STATE.users, action) {
  switch (action.type) {
    case getType(getUsers.getUsersRequest()):
      return {
        ...state,
        loading: true,
      }
    case getType(getUsers.getUsersSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      }
    case getType(getUsers.getUsersFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
