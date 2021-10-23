import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import courseSaga from './courseSaga'
import studentCourseSaga from './studentCourseSaga'

function* rootSaga() {
  yield all([userSaga(), courseSaga(), studentCourseSaga()])
}

export default rootSaga
