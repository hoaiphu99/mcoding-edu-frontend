import { takeLatest, call, put } from 'redux-saga/effects'
import { getUsers } from '../actions'
import { fetchUsers } from '../../api'

function* getUsersSaga() {
  try {
    const users = yield call(fetchUsers)
    yield put(getUsers.getUsersSuccess(users.data))
  } catch (error) {
    yield put(getUsers.getUsersFailure(error))
  }
}

function* userSaga() {
  yield takeLatest(getUsers.getUsersRequest, getUsersSaga)
}

export default userSaga
