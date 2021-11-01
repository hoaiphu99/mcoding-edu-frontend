import { takeLatest, call, put } from 'redux-saga/effects'
// actions
import { getReviewsByCourseID, createNewReview } from '../actions'
// api
import { fetchReviewByCourseID, addNewReview } from '../../api'

// ------------------------------------

// @desc Get Review by course id
function* getReviewsByCourseIDSaga(action) {
  try {
    const review = yield call(fetchReviewByCourseID, action.payload.id)

    yield put(getReviewsByCourseID.getReviewsByCourseIDSuccess(review.data))
  } catch (error) {
    yield put(getReviewsByCourseID.getReviewsByCourseIDFailure(error.response.data))
  }
}

// @desc Create new Review
function* createNewReviewSaga(action) {
  try {
    const review = yield call(addNewReview, action.payload.data)
    yield put(createNewReview.createNewReviewSuccess(review.data))
  } catch (error) {
    yield put(createNewReview.createNewReviewFailure(error.response.data))
  }
}

function* ReviewSaga() {
  yield takeLatest(getReviewsByCourseID.getReviewsByCourseIDRequest, getReviewsByCourseIDSaga)
  yield takeLatest(createNewReview.createNewReviewRequest, createNewReviewSaga)
}

export default ReviewSaga
