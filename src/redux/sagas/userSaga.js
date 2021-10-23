import { takeLatest, call, put } from 'redux-saga/effects'
import { getUsers, registerUser, authUser } from '../actions'
import { fetchUsers, login, register } from '../../api'

function* authUserSaga(action) {
  try {
    const user = yield call(login, action.payload)
    yield put(authUser.authUserSuccess(user.data))
  } catch (error) {
    yield put(authUser.authUserFailure(error.response.data))
  }
}

function* registerUserSaga(action) {
  try {
    const user = yield call(register, action.payload)
    yield put(registerUser.registerUserSuccess(user.data))
  } catch (error) {
    yield put(registerUser.registerUserFailure(error.response.data))
  }
}

function* getUsersSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.token}`,
    },
  }
  try {
    const users = yield call(fetchUsers, config)
    yield put(getUsers.getUsersSuccess(users.data))
  } catch (error) {
    yield put(getUsers.getUsersFailure(error.response.data))
  }
}

function* userSaga() {
  yield takeLatest(getUsers.getUsersRequest, getUsersSaga)
  yield takeLatest(authUser.authUserRequest, authUserSaga)
  yield takeLatest(registerUser.registerUserRequest, registerUserSaga)
}

export default userSaga
