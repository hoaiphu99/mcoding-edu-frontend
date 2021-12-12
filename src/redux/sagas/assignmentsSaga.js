import { takeLatest, call, put } from 'redux-saga/effects'
import { getAssignmentsByLessonId, createAssignments, updateAssignments, deleteAssignments } from '../actions'
import { fetchAssignmentsByLessonID, addAssignments, editAssignments, removeAssignments } from '../../api'

function* getAssignmentsByLessonIdSaga(action) {
  try {
    const assignments = yield call(fetchAssignmentsByLessonID, action.payload.lessonId)
    yield put(getAssignmentsByLessonId.getAssignmentsByLessonIdSuccess(assignments.data))
  } catch (error) {
    yield put(
      getAssignmentsByLessonId.getAssignmentsByLessonIdFailure(
        error.response && error.response.data ? error.response.data : error,
      ),
    )
  }
}

function* createAssignmentsSaga(action) {
  try {
    const assignments = yield call(addAssignments, action.payload.data)
    yield put(createAssignments.createAssignmentsSuccess(assignments.data))
  } catch (error) {
    yield put(
      createAssignments.createAssignmentsFailure(error.response && error.response.data ? error.response.data : error),
    )
  }
}

function* updateAssignmentsSaga(action) {
  try {
    const assignments = yield call(editAssignments, action.payload.data)
    yield put(updateAssignments.updateAssignmentsSuccess(assignments.data))
  } catch (error) {
    yield put(
      updateAssignments.updateAssignmentsFailure(error.response && error.response.data ? error.response.data : error),
    )
  }
}

function* deleteAssignmentsSaga(action) {
  try {
    yield call(removeAssignments, action.payload.id)
    yield put(deleteAssignments.deleteAssignmentsSuccess(action.payload.id))
  } catch (error) {
    yield put(
      deleteAssignments.deleteAssignmentsFailure(error.response && error.response.data ? error.response.data : error),
    )
  }
}

function* AssignmentsSaga() {
  yield takeLatest(getAssignmentsByLessonId.getAssignmentsByLessonIdRequest, getAssignmentsByLessonIdSaga)
  yield takeLatest(createAssignments.createAssignmentsRequest, createAssignmentsSaga)
  yield takeLatest(updateAssignments.updateAssignmentsRequest, updateAssignmentsSaga)
  yield takeLatest(deleteAssignments.deleteAssignmentsRequest, deleteAssignmentsSaga)
}

export default AssignmentsSaga
