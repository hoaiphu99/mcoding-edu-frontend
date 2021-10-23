import { takeLatest, call, put } from 'redux-saga/effects'
// Actions
import { getStudentCourseByCourseID } from '../actions'
// Api
import { fetchStudentCourseByCourseID } from '../../api'

function* getStudentCourseByCourseIDSaga(action) {
  console.log('🚀 ~ file: studentCourseSaga.js ~ line 8 ~ function*getStudentCourseByCourseIDSaga ~ action', action)
  const config = {
    headers: {
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const data = yield call(fetchStudentCourseByCourseID, { id: action.payload.id, config })
    yield put(getStudentCourseByCourseID.getStudentCourseByCourseIDSuccess(data.data))
  } catch (error) {
    yield put(getStudentCourseByCourseID.getStudentCourseByCourseIDFailure(error.response.data))
  }
}

function* studentCourseSaga() {
  yield takeLatest(getStudentCourseByCourseID.getStudentCourseByCourseIDRequest, getStudentCourseByCourseIDSaga)
}
export default studentCourseSaga
