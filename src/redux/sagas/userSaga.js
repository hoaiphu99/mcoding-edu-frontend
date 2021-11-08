import { takeLatest, call, put } from 'redux-saga/effects'
import { getUsers, registerUser, authUser, getUserProfile } from '../actions'
import { fetchUsers, login, register, fetchUserProfile } from '../../api'

function* authUserSaga(action) {
  try {
    const user = yield call(login, action.payload)
    console.log('🚀 ~ file: userSaga.js ~ line 8 ~ function*authUserSaga ~ user', user)
    yield put(authUser.authUserSuccess(user.data))
  } catch (error) {
    yield put(authUser.authUserFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* registerUserSaga(action) {
  try {
    const user = yield call(register, action.payload)
    yield put(registerUser.registerUserSuccess(user.data))
  } catch (error) {
    yield put(registerUser.registerUserFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* getUsersSaga() {
  try {
    const users = yield call(fetchUsers)
    yield put(getUsers.getUsersSuccess(users.data))
  } catch (error) {
    yield put(getUsers.getUsersFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* getUserProfileSaga() {
  try {
    const user = yield call(fetchUserProfile)
    yield put(getUserProfile.getUserProfileSuccess(user.data))
  } catch (error) {
    yield put(getUserProfile.getUserProfileFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* userSaga() {
  yield takeLatest(getUsers.getUsersRequest, getUsersSaga)
  yield takeLatest(authUser.authUserRequest, authUserSaga)
  yield takeLatest(registerUser.registerUserRequest, registerUserSaga)
  yield takeLatest(getUserProfile.getUserProfileRequest, getUserProfileSaga)
}

export default userSaga
