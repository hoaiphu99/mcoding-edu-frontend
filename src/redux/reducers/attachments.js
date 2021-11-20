import { getType, getAttachmentsByLessonId, createAttachment, deleteAttachment } from '../actions'
import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'

export const attachmentReducers = (state = INIT_STATE.attachments, action) => {
  switch (action.type) {
    // Get Attachment by lessonId
    case getType(getAttachmentsByLessonId.getAttachmentsByLessonIdRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getAttachmentsByLessonId.getAttachmentsByLessonIdSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getAttachmentsByLessonId.getAttachmentsByLessonIdFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Create Attachment
    case getType(createAttachment.createAttachmentRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(createAttachment.createAttachmentSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.CREATE,
        loading: false,
        data: {
          attachments: [...state.data.attachments, ...action.payload.data],
          count: state.data.count + action.payload.data.length,
        },
        error: null,
      }
    case getType(createAttachment.createAttachmentFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Delete Attachment
    case getType(deleteAttachment.deleteAttachmentRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(deleteAttachment.deleteAttachmentSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.DELETE,
        loading: false,
        data: {
          attachments: state.data.attachments.filter((item) => item.attachment_id !== action.payload),
          count: state.data.count - 1,
        },
        error: null,
      }
    case getType(deleteAttachment.deleteAttachmentFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case 'RESET_STATE':
      return {
        ...state,
        success: null,
      }
    default:
      return state
  }
}
