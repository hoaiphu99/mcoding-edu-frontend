import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import courseSaga from './courseSaga'

function* rootSaga() {
  yield all([userSaga(), courseSaga()])
}

export default rootSaga
