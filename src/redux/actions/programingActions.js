import { createActions } from 'redux-actions'

export const getPrograming = createActions({
  getProgramingRequest: () => undefined,
  getProgramingSuccess: (payload) => payload,
  getProgramingFailure: (err) => err,
})
