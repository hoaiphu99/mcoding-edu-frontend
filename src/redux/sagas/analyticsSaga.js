import { takeLatest, call, put } from 'redux-saga/effects'
import {
  getCourseTotal,
  getUserTotal,
  getStudentTotal,
  getStudentInCourseAnalytics,
  getStudentsAttendedCourseAnalytics,
} from '../actions'
import {
  fetchStudentsInCourseAnalytics,
  countCourseTotalAnalytics,
  countUserTotalAnalytics,
  countStudentTotalAnalytics,
  fetchStudentsAttendedCourseAnalytics,
} from '../../api'

function* getStudentInCourseAnalyticsSaga() {
  try {
    const response = yield call(fetchStudentsInCourseAnalytics)
    yield put(getStudentInCourseAnalytics.getStudentInCourseAnalyticsSuccess(response.data))
  } catch (error) {
    yield put(getStudentInCourseAnalytics.getStudentInCourseAnalyticsFailure(error))
  }
}

function* getCourseTotalAnalyticsSaga() {
  try {
    const response = yield call(countCourseTotalAnalytics)
    yield put(getCourseTotal.getCourseTotalSuccess(response.data))
  } catch (error) {
    yield put(getCourseTotal.getCourseTotalFailure(error))
  }
}

function* getUserTotalAnalyticsSaga() {
  try {
    const response = yield call(countUserTotalAnalytics)
    yield put(getUserTotal.getUserTotalSuccess(response.data))
  } catch (error) {
    yield put(getUserTotal.getUserTotalFailure(error))
  }
}

function* getStudentTotalAnalyticsSaga() {
  try {
    const response = yield call(countStudentTotalAnalytics)
    yield put(getStudentTotal.getStudentTotalSuccess(response.data))
  } catch (error) {
    yield put(getStudentTotal.getStudentTotalFailure(error))
  }
}

function* getStudentsAttendedCourseAnalyticsSaga(action) {
  try {
    const response = yield call(fetchStudentsAttendedCourseAnalytics, action.payload.query)
    yield put(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsSuccess(response.data))
  } catch (error) {
    yield put(getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsFailure(error))
  }
}

function* analyticsSaga() {
  yield takeLatest(getStudentInCourseAnalytics.getStudentInCourseAnalyticsRequest, getStudentInCourseAnalyticsSaga)
  yield takeLatest(getCourseTotal.getCourseTotalRequest, getCourseTotalAnalyticsSaga)
  yield takeLatest(getUserTotal.getUserTotalRequest, getUserTotalAnalyticsSaga)
  yield takeLatest(getStudentTotal.getStudentTotalRequest, getStudentTotalAnalyticsSaga)
  yield takeLatest(
    getStudentsAttendedCourseAnalytics.getStudentsAttendedCourseAnalyticsRequest,
    getStudentsAttendedCourseAnalyticsSaga,
  )
}

export default analyticsSaga
