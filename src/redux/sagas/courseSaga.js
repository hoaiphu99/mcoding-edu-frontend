import { takeLatest, call, put } from 'redux-saga/effects'
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseStatus,
  getCourseDetails,
  getCourseLesson,
  createSection,
  updateSection,
  deleteSection,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../actions'
import {
  fetchAllCourses,
  addNewCourse,
  editCourse,
  removeCourse,
  editCourseStatus,
  fetchCourse,
  fetchCourseLearning,
  addNewSection,
  editSection,
  removeSection,
  addNewLesson,
  editLesson,
  removeLesson,
} from '../../api'

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

function* updateCourseSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const course = yield call(editCourse, { data: action.payload.data, config })
    yield put(updateCourse.updateCourseSuccess(course.data))
  } catch (error) {
    yield put(updateCourse.updateCourseFailure(error.response.data))
  }
}

function* deleteCourseSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    yield call(removeCourse, { id: action.payload.id, config })
    yield put(deleteCourse.deleteCourseSuccess(action.payload.id))
  } catch (error) {
    yield put(deleteCourse.deleteCourseFailure(error.response.data))
  }
}

function* getCourseDetailsSaga(action) {
  try {
    const course = yield call(fetchCourse, action.payload)
    yield put(getCourseDetails.getCourseDetailsSuccess(course.data))
  } catch (error) {
    yield put(getCourseDetails.getCourseDetailsFailure(error.response.data))
  }
}

function* getCourseLessonSaga(action) {
  const config = {
    headers: {
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const course = yield call(fetchCourseLearning, { data: action.payload.data, config })
    yield put(getCourseLesson.getCourseLessonSuccess(course.data))
  } catch (error) {
    yield put(getCourseLesson.getCourseLessonFailure(error.response.data))
  }
}

function* updateCourseStatusSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const course = yield call(editCourseStatus, { data: action.payload.data, config })
    yield put(updateCourseStatus.updateCourseStatusSuccess(course.data))
  } catch (error) {
    yield put(updateCourseStatus.updateCourseStatusFailure(error.response.data))
  }
}

// SectionSagas

function* createSectionSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const section = yield call(addNewSection, { data: action.payload.data, config })
    yield put(createSection.createSectionSuccess(section.data))
  } catch (error) {
    yield put(createSection.createSectionFailure(error.response.data))
  }
}

function* updateSectionSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const section = yield call(editSection, { data: action.payload.data, config })
    yield put(updateSection.updateSectionSuccess(section.data))
  } catch (error) {
    yield put(updateSection.updateSectionFailure(error.response.data))
  }
}

function* deleteSectionSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    yield call(removeSection, { id: action.payload.id, config })
    yield put(deleteSection.deleteSectionSuccess(action.payload.id))
  } catch (error) {
    yield put(deleteSection.deleteSectionFailure(error.response.data))
  }
}

// LessonSagas

function* createLessonSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const lesson = yield call(addNewLesson, { data: action.payload.data, config })
    yield put(createLesson.createLessonSuccess(lesson.data))
  } catch (error) {
    console.log({ error })
    yield put(createLesson.createLessonFailure(error.response.data))
  }
}

function* updateLessonSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    const lesson = yield call(editLesson, { data: action.payload.data, config })
    yield put(updateLesson.updateLessonSuccess(lesson.data))
  } catch (error) {
    yield put(updateLesson.updateLessonFailure(error.response.data))
  }
}

function* deleteLessonSaga(action) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.payload.userLogin.token}`,
    },
  }
  try {
    yield call(removeLesson, { id: action.payload.id, config })
    yield put(deleteLesson.deleteLessonSuccess(action.payload.id))
  } catch (error) {
    yield put(deleteLesson.deleteLessonFailure(error.response.data))
  }
}

function* courseSaga() {
  yield takeLatest(getAllCourses.getAllCoursesRequest, getAllCoursesSaga)
  yield takeLatest(createCourse.createCourseRequest, createCourseSaga)
  yield takeLatest(updateCourse.updateCourseRequest, updateCourseSaga)
  yield takeLatest(deleteCourse.deleteCourseRequest, deleteCourseSaga)
  yield takeLatest(getCourseDetails.getCourseDetailsRequest, getCourseDetailsSaga)
  yield takeLatest(getCourseLesson.getCourseLessonRequest, getCourseLessonSaga)
  yield takeLatest(updateCourseStatus.updateCourseStatusRequest, updateCourseStatusSaga)
  yield takeLatest(createSection.createSectionRequest, createSectionSaga)
  yield takeLatest(updateSection.updateSectionRequest, updateSectionSaga)
  yield takeLatest(deleteSection.deleteSectionRequest, deleteSectionSaga)
  yield takeLatest(createLesson.createLessonRequest, createLessonSaga)
  yield takeLatest(updateLesson.updateLessonRequest, updateLessonSaga)
  yield takeLatest(deleteLesson.deleteLessonRequest, deleteLessonSaga)
}

export default courseSaga
