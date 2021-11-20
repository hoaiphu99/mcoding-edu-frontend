import { createActions } from 'redux-actions'

export const getProgramLanguages = createActions({
  getProgramLanguagesRequest: () => undefined,
  getProgramLanguagesSuccess: (payload) => payload,
  getProgramLanguagesFailure: (err) => err,
})
