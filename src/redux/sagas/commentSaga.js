import { takeLatest, call, put } from 'redux-saga/effects'
// actions
import { getCommentsByLessonID, createNewComment } from '../actions'
// api
import { fetchCommentsByLessonID, addNewComment } from '../../api'

// ------------------------------------

// @desc Get comments by lesson id
function* getCommentByLessonIDSaga(action) {
  try {
    const comments = yield call(fetchCommentsByLessonID, action.payload.id)
    console.log('🚀 ~ file: commentSaga.js ~ line 13 ~ function*getCommentByLessonIDSaga ~ comments', comments.data)
    yield put(getCommentsByLessonID.getCommentsByLessonIDSuccess(comments.data))
  } catch (error) {
    yield put(
      getCommentsByLessonID.getCommentsByLessonIDFailure(
        error.response && error.response.data ? error.response.data : error,
      ),
    )
  }
}

// @desc Create new comment
function* createNewCommentSaga(action) {
  try {
    const comment = yield call(addNewComment, action.payload.data)
    yield put(createNewComment.createNewCommentSuccess(comment.data))
  } catch (error) {
    yield put(
      createNewComment.createNewCommentFailure(error.response && error.response.data ? error.response.data : error),
    )
  }
}

function* commentSaga() {
  yield takeLatest(getCommentsByLessonID.getCommentsByLessonIDRequest, getCommentByLessonIDSaga)
  yield takeLatest(createNewComment.createNewCommentRequest, createNewCommentSaga)
}

export default commentSaga
