import { takeLatest, call, put } from 'redux-saga/effects'
// Actions
import { getStudentCourseByStudentId, registerStudentCourse } from '../actions'
// Api
import { fetchStudentCourseByStudentId, addNewStudentCourse } from '../../api'

function* getStudentCourseByStudentIdSaga(action) {
  try {
    const data = yield call(fetchStudentCourseByStudentId, action.payload.id)
    yield put(getStudentCourseByStudentId.getStudentCourseByStudentIdSuccess(data.data))
  } catch (error) {
    yield put(
      getStudentCourseByStudentId.getStudentCourseByStudentIdFailure(
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
  yield takeLatest(getStudentCourseByStudentId.getStudentCourseByStudentIdRequest, getStudentCourseByStudentIdSaga)
  yield takeLatest(registerStudentCourse.registerStudentCourseRequest, registerStudentCourseSaga)
}
export default studentCourseSaga
