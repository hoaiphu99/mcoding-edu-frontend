import { createActions } from 'redux-actions'

export const getStudentList = createActions({
  getStudentListRequest: () => undefined,
  getStudentListSuccess: (payload) => payload,
  getStudentListFailure: (err) => err,
})

export const bannedStudent = createActions({
  bannedStudentRequest: (payload) => payload,
  bannedStudentSuccess: (payload) => payload,
  bannedStudentFailure: (err) => err,
})
