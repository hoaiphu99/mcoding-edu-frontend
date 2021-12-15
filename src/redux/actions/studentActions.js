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

export const changeStudentPassword = createActions({
  changeStudentPasswordRequest: (payload) => payload,
  changeStudentPasswordSuccess: (payload) => payload,
  changeStudentPasswordFailure: (err) => err,
})

export const leaveACourse = createActions({
  leaveACourseRequest: (payload) => payload,
  leaveACourseSuccess: (payload) => payload,
  leaveACourseFailure: (err) => err,
})
