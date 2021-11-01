import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import courseSaga from './courseSaga'
import studentCourseSaga from './studentCourseSaga'
import commentSaga from './commentSaga'
import reviewSaga from './reviewSaga'

function* rootSaga() {
  yield all([userSaga(), courseSaga(), studentCourseSaga(), commentSaga(), reviewSaga()])
}

export default rootSaga
