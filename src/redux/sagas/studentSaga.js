import { takeLatest, call, put } from 'redux-saga/effects'
import { getStudentList, bannedStudent } from '../actions'
import { fetchStudents, banStudent } from '../../api'

function* getStudentListSaga() {
  try {
    const students = yield call(fetchStudents)
    yield put(getStudentList.getStudentListSuccess(students.data))
  } catch (error) {
    yield put(getStudentList.getStudentListFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* banStudentSaga(action) {
  try {
    const student = yield call(banStudent, action.payload.data)
    yield put(bannedStudent.bannedStudentSuccess(student.data))
  } catch (error) {
    yield put(bannedStudent.bannedStudentFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* studentSaga() {
  yield takeLatest(getStudentList.getStudentListRequest, getStudentListSaga)
  yield takeLatest(bannedStudent.bannedStudentRequest, banStudentSaga)
}

export default studentSaga
