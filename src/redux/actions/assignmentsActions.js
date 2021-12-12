import { createActions } from 'redux-actions'

export const getAssignmentsByLessonId = createActions({
  getAssignmentsByLessonIdRequest: (payload) => payload,
  getAssignmentsByLessonIdSuccess: (payload) => payload,
  getAssignmentsByLessonIdFailure: (err) => err,
})

export const createAssignments = createActions({
  createAssignmentsRequest: (payload) => payload,
  createAssignmentsSuccess: (payload) => payload,
  createAssignmentsFailure: (err) => err,
})

export const updateAssignments = createActions({
  updateAssignmentsRequest: (payload) => payload,
  updateAssignmentsSuccess: (payload) => payload,
  updateAssignmentsFailure: (err) => err,
})

export const deleteAssignments = createActions({
  deleteAssignmentsRequest: (payload) => payload,
  deleteAssignmentsSuccess: (payload) => payload,
  deleteAssignmentsFailure: (err) => err,
})
