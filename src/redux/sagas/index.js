import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import studentSaga from './studentSaga'
import courseSaga from './courseSaga'
import studentCourseSaga from './studentCourseSaga'
import commentSaga from './commentSaga'
import reviewSaga from './reviewSaga'
import categorySaga from './categorySaga'
import programingLanguagesSaga from './programLanguagesSaga'
import attachmentSaga from './attachmentSaga'
import analyticsSaga from './analyticsSaga'

function* rootSaga() {
  yield all([
    userSaga(),
    studentSaga(),
    courseSaga(),
    studentCourseSaga(),
    commentSaga(),
    reviewSaga(),
    categorySaga(),
    programingLanguagesSaga(),
    attachmentSaga(),
    analyticsSaga(),
  ])
}

export default rootSaga
