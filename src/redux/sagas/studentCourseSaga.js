import { takeLatest, call, put } from 'redux-saga/effects'
// Actions
import { getStudentCourseByStudentAndCourseId, registerStudentCourse } from '../actions'
// Api
import { fetchStudentCourseByStudentAndCourseId, addNewStudentCourse } from '../../api'

function* getStudentCourseByStudentAndCourseIdSaga(action) {
  try {
    const data = yield call(fetchStudentCourseByStudentAndCourseId, action.payload.data)
    yield put(getStudentCourseByStudentAndCourseId.getStudentCourseByStudentAndCourseIdSuccess(data.data))
  } catch (error) {
    yield put(
      getStudentCourseByStudentAndCourseId.getStudentCourseByStudentAndCourseIdFailure(
        error.response && error.response.data ? error.response.data : error,
      ),
    )
  }
}

function* registerStudentCourseSaga(action) {
  try {
    const data = yield call(addNewStudentCourse, action.payload.data)
    yield put(registerStudentCourse.registerStudentCourseSuccess(data.data))
  } catch (error) {
    yield put(
      registerStudentCourse.registerStudentCourseFailure(
        error.response && error.response.data ? error.response.data : error,
      ),
    )
  }
}

function* studentCourseSaga() {
  yield takeLatest(
    getStudentCourseByStudentAndCourseId.getStudentCourseByStudentAndCourseIdRequest,
    getStudentCourseByStudentAndCourseIdSaga,
  )
  yield takeLatest(registerStudentCourse.registerStudentCourseRequest, registerStudentCourseSaga)
}
export default studentCourseSaga
