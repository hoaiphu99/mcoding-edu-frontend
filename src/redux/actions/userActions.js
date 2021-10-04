import { createActions } from 'redux-actions'

export const getUsers = createActions({
  getUsersRequest: () => undefined,
  getUsersSuccess: (payload) => payload,
  getUsersFailure: (err) => err,
})
