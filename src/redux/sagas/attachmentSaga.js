import { takeLatest, call, put } from 'redux-saga/effects'
import { getAttachmentsByLessonId, createAttachment, deleteAttachment } from '../actions'
import { fetchAttachmentByLessonID, addAttachment, removeAttachment } from '../../api'

function* getAttachmentsByLessonIdSaga(action) {
  try {
    const attachments = yield call(fetchAttachmentByLessonID, action.payload.lessonId)
    yield put(getAttachmentsByLessonId.getAttachmentsByLessonIdSuccess(attachments.data))
  } catch (error) {
    yield put(
      getAttachmentsByLessonId.getAttachmentsByLessonIdFailure(
        error.response && error.response.data ? error.response.data : error,
      ),
    )
  }
}

function* createAttachmentSaga(action) {
  try {
    const attachment = yield call(addAttachment, action.payload.data)
    yield put(createAttachment.createAttachmentSuccess(attachment.data))
  } catch (error) {
    yield put(
      createAttachment.createAttachmentFailure(error.response && error.response.data ? error.response.data : error),
    )
  }
}

function* deleteAttachmentSaga(action) {
  try {
    yield call(removeAttachment, action.payload.id)
    yield put(deleteAttachment.deleteAttachmentSuccess(action.payload.id))
  } catch (error) {
    yield put(
      deleteAttachment.deleteAttachmentFailure(error.response && error.response.data ? error.response.data : error),
    )
  }
}

function* attachmentSaga() {
  yield takeLatest(getAttachmentsByLessonId.getAttachmentsByLessonIdRequest, getAttachmentsByLessonIdSaga)
  yield takeLatest(createAttachment.createAttachmentRequest, createAttachmentSaga)
  yield takeLatest(deleteAttachment.deleteAttachmentRequest, deleteAttachmentSaga)
}

export default attachmentSaga
