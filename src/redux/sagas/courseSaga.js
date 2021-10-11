import { takeLatest, call, put } from 'redux-saga/effects'
import { getAllCourses, createCourse, getCourseDetails } from '../actions'
import { fetchAllCourses, addNewCourse, fetchCourse } from '../../api'

function* getAllCoursesSaga() {
  try {
    const courses = yield call(fetchAllCourses)
    yield put(getAllCourses.getAllCoursesSuccess(courses.data))
  } catch (error) {
    yield put(getAllCourses.getAllCoursesFailure(error.response.data))
  }
}

function* createCourseSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const course = yield call(addNewCourse, { data: action.payload.data, config })
    yield put(createCourse.createCourseSuccess(course.data))
  } catch (error) {
    yield put(createCourse.createCourseFailure(error.response.data))
  }
}

function* getCourseDetailsSaga(action) {
  console.log('vo saga', action.payload)
  try {
    const course = yield call(fetchCourse, action.payload)
    yield put(getCourseDetails.getCourseDetailsSuccess(course.data))
  } catch (error) {
    yield put(getCourseDetails.getCourseDetailsFailure(error.response.data))
  }
}

function* courseSaga() {
  yield takeLatest(getAllCourses.getAllCoursesRequest, getAllCoursesSaga)
  yield takeLatest(createCourse.createCourseRequest, createCourseSaga)
  yield takeLatest(getCourseDetails.getCourseDetailsRequest, getCourseDetailsSaga)
}

export default courseSaga
