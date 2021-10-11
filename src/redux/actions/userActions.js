import { createActions } from 'redux-actions'

export const authUser = createActions({
  authUserRequest: (payload) => payload,
  authUserSuccess: (payload) => payload,
  authUserFailure: (err) => err,
  authUserLogout: () => undefined,
})

export const getUsers = createActions({
  getUsersRequest: (payload) => payload,
  getUsersSuccess: (payload) => payload,
  getUsersFailure: (err) => err,
})
