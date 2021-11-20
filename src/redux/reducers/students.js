import { INIT_STATE } from '../initialState'
import { getType, getStudentList, bannedStudent } from '../actions'

export const studentReducers = (state = INIT_STATE.students, action) => {
  switch (action.type) {
    case getType(getStudentList.getStudentListRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getStudentList.getStudentListSuccess()):
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      }
    case getType(getStudentList.getStudentListFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(bannedStudent.bannedStudentRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(bannedStudent.bannedStudentSuccess()): {
      const newData = state.data.map((item) => {
        if (item.student_id === action.payload.data.student_id) {
          return action.payload.data
        }
        return item
      })

      return {
        ...state,
        loading: false,
        error: null,
        data: newData,
      }
    }
    case getType(bannedStudent.bannedStudentFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}
