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
  getMyCourses,
  getStudentsInCourse,
  deleteStudentInCourse,
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
  fetchMyCourses,
  fetchStudentsInCourse,
  removeStudentInCourse,
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
  try {
    const course = yield call(addNewCourse, action.payload.data)
    yield put(createCourse.createCourseSuccess(course.data))
  } catch (error) {
    yield put(createCourse.createCourseFailure(error.response.data))
  }
}

function* updateCourseSaga(action) {
  try {
    const course = yield call(editCourse, action.payload.data)
    yield put(updateCourse.updateCourseSuccess(course.data))
  } catch (error) {
    yield put(updateCourse.updateCourseFailure(error.response.data))
  }
}

function* deleteCourseSaga(action) {
  try {
    yield call(removeCourse, action.payload.id)
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
  try {
    const course = yield call(fetchCourseLearning, action.payload.slug)
    yield put(getCourseLesson.getCourseLessonSuccess(course.data))
  } catch (error) {
    yield put(getCourseLesson.getCourseLessonFailure(error.response.data))
  }
}

function* updateCourseStatusSaga(action) {
  try {
    const course = yield call(editCourseStatus, action.payload.data)
    yield put(updateCourseStatus.updateCourseStatusSuccess(course.data))
  } catch (error) {
    yield put(updateCourseStatus.updateCourseStatusFailure(error.response.data))
  }
}

function* getMyCoursesSaga() {
  try {
    const course = yield call(fetchMyCourses)
    yield put(getMyCourses.getMyCoursesSuccess(course.data))
  } catch (error) {
    yield put(getMyCourses.getMyCoursesFailure(error.response.data))
  }
}

function* getStudentsInCourseSaga(action) {
  try {
    const students = yield call(fetchStudentsInCourse, action.payload.id)
    yield put(getStudentsInCourse.getStudentsInCourseSuccess(students.data))
  } catch (error) {
    yield put(getStudentsInCourse.getStudentsInCourseFailure(error.response.data))
  }
}

function* deleteStudentInCourseSaga(action) {
  try {
    yield call(removeStudentInCourse, action.payload.data)
    yield put(deleteStudentInCourse.deleteStudentInCourseSuccess(action.payload.data))
  } catch (error) {
    yield put(deleteStudentInCourse.deleteStudentInCourseFailure(error.response.data))
  }
}

// SectionSagas

function* createSectionSaga(action) {
  try {
    const section = yield call(addNewSection, action.payload.data)
    yield put(createSection.createSectionSuccess(section.data))
  } catch (error) {
    yield put(createSection.createSectionFailure(error.response.data))
  }
}

function* updateSectionSaga(action) {
  try {
    const section = yield call(editSection, action.payload.data)
    yield put(updateSection.updateSectionSuccess(section.data))
  } catch (error) {
    yield put(updateSection.updateSectionFailure(error.response.data))
  }
}

function* deleteSectionSaga(action) {
  try {
    yield call(removeSection, action.payload.id)
    yield put(deleteSection.deleteSectionSuccess(action.payload.id))
  } catch (error) {
    yield put(deleteSection.deleteSectionFailure(error.response.data))
  }
}

// LessonSagas

function* createLessonSaga(action) {
  try {
    const lesson = yield call(addNewLesson, action.payload.data)
    yield put(createLesson.createLessonSuccess(lesson.data))
  } catch (error) {
    console.log({ error })
    yield put(createLesson.createLessonFailure(error.response.data))
  }
}

function* updateLessonSaga(action) {
  try {
    const lesson = yield call(editLesson, action.payload.data)
    yield put(updateLesson.updateLessonSuccess(lesson.data))
  } catch (error) {
    yield put(updateLesson.updateLessonFailure(error.response.data))
  }
}

function* deleteLessonSaga(action) {
  try {
    yield call(removeLesson, action.payload.id)
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
  yield takeLatest(getMyCourses.getMyCoursesRequest, getMyCoursesSaga)
  yield takeLatest(getStudentsInCourse.getStudentsInCourseRequest, getStudentsInCourseSaga)
  yield takeLatest(deleteStudentInCourse.deleteStudentInCourseRequest, deleteStudentInCourseSaga)
}

export default courseSaga
