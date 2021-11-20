import { createActions } from 'redux-actions'

export const authUser = createActions({
  authUserRequest: (payload) => payload,
  authUserSuccess: (payload) => payload,
  authUserFailure: (err) => err,
  authUserLogout: () => undefined,
})

export const registerUser = createActions({
  registerUserRequest: (payload) => payload,
  registerUserSuccess: (payload) => payload,
  registerUserFailure: (err) => err,
})

export const getUsers = createActions({
  getUsersRequest: (payload) => payload,
  getUsersSuccess: (payload) => payload,
  getUsersFailure: (err) => err,
})

export const getUserProfile = createActions({
  getUserProfileRequest: (payload) => payload,
  getUserProfileSuccess: (payload) => payload,
  getUserProfileFailure: (err) => err,
})

export const bannedUser = createActions({
  bannedUserRequest: (payload) => payload,
  bannedUserSuccess: (payload) => payload,
  bannedUserFailure: (err) => err,
})
