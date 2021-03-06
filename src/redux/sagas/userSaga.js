import { takeLatest, call, put } from 'redux-saga/effects'
import {
  getUsers,
  registerUser,
  updateUser,
  authUser,
  getUserProfile,
  bannedUser,
  editUserStatus,
  changeUserPassword,
} from '../actions'
import {
  fetchUsers,
  login,
  register,
  fetchUserProfile,
  banUser,
  updateUserStatus,
  updatePassword,
  editUser,
} from '../../api'

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

function* bannedUserSaga(action) {
  try {
    const user = yield call(banUser, action.payload.data)
    console.log('🚀 ~ file: userSaga.js ~ line 45 ~ function*bannedUserSaga ~ user', user)
    yield put(bannedUser.bannedUserSuccess(user.data))
  } catch (error) {
    yield put(bannedUser.bannedUserFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* editUserStatusSaga(action) {
  try {
    const user = yield call(updateUserStatus, action.payload.data)
    yield put(editUserStatus.editUserStatusSuccess(user.data))
  } catch (error) {
    yield put(editUserStatus.editUserStatusFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* changeUserPasswordSaga(action) {
  try {
    const user = yield call(updatePassword, action.payload.data)
    yield put(changeUserPassword.changeUserPasswordSuccess(user.data))
  } catch (error) {
    yield put(
      changeUserPassword.changeUserPasswordFailure(error.response && error.response.data ? error.response.data : error),
    )
  }
}

function* updateUserSaga(action) {
  try {
    const user = yield call(editUser, action.payload.data)
    yield put(updateUser.updateUserSuccess(user.data))
  } catch (error) {
    yield put(updateUser.updateUserFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* userSaga() {
  yield takeLatest(getUsers.getUsersRequest, getUsersSaga)
  yield takeLatest(authUser.authUserRequest, authUserSaga)
  yield takeLatest(registerUser.registerUserRequest, registerUserSaga)
  yield takeLatest(getUserProfile.getUserProfileRequest, getUserProfileSaga)
  yield takeLatest(bannedUser.bannedUserRequest, bannedUserSaga)
  yield takeLatest(editUserStatus.editUserStatusRequest, editUserStatusSaga)
  yield takeLatest(changeUserPassword.changeUserPasswordRequest, changeUserPasswordSaga)
  yield takeLatest(updateUser.updateUserRequest, updateUserSaga)
}

export default userSaga
