import { takeLatest, call, put } from 'redux-saga/effects'
import { getStudentList, bannedStudent, changeStudentPassword } from '../actions'
import { fetchStudents, banStudent, updateStudentPassword } from '../../api'

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

function* changeStudentPasswordSaga(action) {
  try {
    const student = yield call(updateStudentPassword, action.payload.data)
    yield put(changeStudentPassword.changeStudentPasswordSuccess(student.data))
  } catch (error) {
    yield put(
      changeStudentPassword.changeStudentPasswordFailure(
        error.response && error.response.data ? error.response.data : error,
      ),
    )
  }
}

function* studentSaga() {
  yield takeLatest(getStudentList.getStudentListRequest, getStudentListSaga)
  yield takeLatest(bannedStudent.bannedStudentRequest, banStudentSaga)
  yield takeLatest(changeStudentPassword.changeStudentPasswordRequest, changeStudentPasswordSaga)
}

export default studentSaga
