import { takeLatest, call, put } from 'redux-saga/effects'
// Actions
import { getStudentCourseByCourseID, registerStudentCourse } from '../actions'
// Api
import { fetchStudentCourseByCourseID, addNewStudentCourse } from '../../api'

function* getStudentCourseByCourseIDSaga(action) {
  try {
    const data = yield call(fetchStudentCourseByCourseID, action.payload.id)
    yield put(getStudentCourseByCourseID.getStudentCourseByCourseIDSuccess(data.data))
  } catch (error) {
    yield put(getStudentCourseByCourseID.getStudentCourseByCourseIDFailure(error.response.data))
  }
}

function* registerStudentCourseSaga(action) {
  try {
    const data = yield call(addNewStudentCourse, action.payload.data)
    yield put(registerStudentCourse.registerStudentCourseSuccess(data.data))
  } catch (error) {
    yield put(registerStudentCourse.registerStudentCourseFailure(error.response.data))
  }
}

function* studentCourseSaga() {
  yield takeLatest(getStudentCourseByCourseID.getStudentCourseByCourseIDRequest, getStudentCourseByCourseIDSaga)
  yield takeLatest(registerStudentCourse.registerStudentCourseRequest, registerStudentCourseSaga)
}
export default studentCourseSaga
