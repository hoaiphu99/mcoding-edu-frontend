import { createActions } from 'redux-actions'

export const getCategories = createActions({
  getCategoriesRequest: () => undefined,
  getCategoriesSuccess: (payload) => payload,
  getCategoriesFailure: (err) => err,
})
