import { INIT_STATE, SUCCESS_ACTION_TYPE } from '../initialState'
import {
  getType,
  getAllCourses,
  getAllCoursesPublic,
  getAllCoursesByCategoryId,
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
  getLessonById,
  leaveACourse,
} from '../actions'

// @desc reducer for courses
export const coursesReducers = (state = INIT_STATE.courses, action) => {
  switch (action.type) {
    case getType(getAllCourses.getAllCoursesRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getAllCourses.getAllCoursesSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        count: action.payload.count,
        error: null,
      }
    case getType(getAllCourses.getAllCoursesFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(createCourse.createCourseRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(createCourse.createCourseSuccess()):
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
        pageSize: Math.ceil((state.count + 1) / state.rowsPerPage),
        count: state.count + 1,
        error: null,
      }
    case getType(createCourse.createCourseFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(updateCourse.updateCourseRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(updateCourse.updateCourseSuccess()): {
      const newData = state.data.map((item) => {
        if (item.course_id === action.payload.data.course_id) {
          return action.payload.data
        }
        return item
      })
      return {
        ...state,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(updateCourse.updateCourseFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(deleteCourse.deleteCourseRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(deleteCourse.deleteCourseSuccess()): {
      const newData = state.data.filter((item) => item.course_id !== action.payload)
      return {
        ...state,
        loading: false,
        data: newData,
        pageSize: Math.ceil((state.count - 1) / state.rowsPerPage),
        count: state.count - 1,
        error: null,
      }
    }
    case getType(deleteCourse.deleteCourseFailure()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    case getType(updateCourseStatus.updateCourseStatusRequest()):
      return {
        ...state,
        success: false,
        loading: true,
        error: null,
      }
    case getType(updateCourseStatus.updateCourseStatusSuccess()): {
      const newData = state.data.map((item) => {
        if (item.course_id === action.payload.data.course_id) {
          return action.payload.data
        }
        return item
      })
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(updateCourseStatus.updateCourseStatusFailure()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}

// @desc reducer for courses public
export const coursesPublicReducers = (state = INIT_STATE.coursesPublic, action) => {
  switch (action.type) {
    case getType(getAllCoursesPublic.getAllCoursesPublicRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getAllCoursesPublic.getAllCoursesPublicSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        count: action.payload.count,
        error: null,
      }
    case getType(getAllCoursesPublic.getAllCoursesPublicFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // getAllCoursesByCategoryId
    case getType(getAllCoursesByCategoryId.getAllCoursesByCategoryIdRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getAllCoursesByCategoryId.getAllCoursesByCategoryIdSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        count: action.payload.count,
        error: null,
      }
    case getType(getAllCoursesByCategoryId.getAllCoursesByCategoryIdFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}

// @desc reducer for course details
export const courseDetailsReducers = (state = INIT_STATE.courseDetails, action) => {
  switch (action.type) {
    case getType(getCourseDetails.getCourseDetailsRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getCourseDetails.getCourseDetailsSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getCourseDetails.getCourseDetailsFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    default:
      return state
  }
}

// @desc reducer for course lessons
export const courseLessonReducers = (state = INIT_STATE.courseLesson, action) => {
  switch (action.type) {
    // Get Course Lesson
    case getType(getCourseLesson.getCourseLessonRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(getCourseLesson.getCourseLessonSuccess()):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getCourseLesson.getCourseLessonFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Create Section
    case getType(createSection.createSectionRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(createSection.createSectionSuccess()): {
      const newData = state.data
      newData.sections = [...newData.sections, action.payload.data]

      return {
        ...state,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(createSection.createSectionFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Update Section
    case getType(updateSection.updateSectionRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(updateSection.updateSectionSuccess()): {
      const newData = state.data
      newData.sections = newData.sections.map((item) => {
        if (item.section_id === action.payload.data.section_id) {
          item.section_number = action.payload.data.section_number
          item.name = action.payload.data.name
        }
        return item
      })
      return {
        ...state,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(updateSection.updateSectionFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Delete Section
    case getType(deleteSection.deleteSectionRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(deleteSection.deleteSectionSuccess()): {
      const newData = state.data
      newData.sections = newData.sections.filter((item) => item.section_id !== action.payload)

      return {
        ...state,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(deleteSection.deleteSectionFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Create Lesson
    case getType(createLesson.createLessonRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(createLesson.createLessonSuccess()): {
      const newLesson = action.payload.data
      const newData = state.data
      newData.sections.map((item) => {
        if (item.section_id === newLesson.section_id) {
          item.lessons = [...item.lessons, newLesson]
        }
        return item
      })
      return {
        ...state,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(createLesson.createLessonFailure()):
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Update Lesson
    case getType(updateLesson.updateLessonRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(updateLesson.updateLessonSuccess()): {
      const newData = state.data
      newData.sections.map((item) => {
        item.lessons = item.lessons.map((lesson) => {
          if (lesson.lesson_id === action.payload.data.lesson_id) {
            lesson = action.payload.data
          }
          return lesson
        })
        return item
      })
      return {
        ...state,
        loading: false,
        data: newData,
        error: null,
      }
    }
    case getType(updateLesson.updateLessonFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Delete Lesson
    case getType(deleteLesson.deleteLessonRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(deleteLesson.deleteLessonSuccess()): {
      const newData = state.data
      newData.sections.map((item) => {
        item.lessons = item.lessons.filter((lesson) => lesson.lesson_id !== action.payload)
        return item
      })
      return {
        ...state,
        loading: false,
        data: newData,
        error: null,
      }
    }
    default:
      return state
  }
}

// @desc reducer for my courses
export const myCoursesReducers = (state = INIT_STATE.coursesMy, action) => {
  switch (action.type) {
    // Get My Courses
    case getType(getMyCourses.getMyCoursesRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getMyCourses.getMyCoursesSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        data: action.payload.data,
        error: null,
      }
    case getType(getMyCourses.getMyCoursesFailure()):
      return {
        ...state,
        success: null,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // leave a course
    case getType(leaveACourse.leaveACourseRequest()):
      return {
        ...state,
        error: null,
      }
    case getType(leaveACourse.leaveACourseSuccess()): {
      const newData = state.data.filter((item) => item.course_id !== action.payload)
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.DELETE,
        data: newData,
        error: null,
      }
    }
    case getType(leaveACourse.leaveACourseFailure()):
      return {
        ...state,
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

export const studentsInCourseReducers = (state = INIT_STATE.studentsInCourse, action) => {
  switch (action.type) {
    // Get Students In Course
    case getType(getStudentsInCourse.getStudentsInCourseRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getStudentsInCourse.getStudentsInCourseSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getStudentsInCourse.getStudentsInCourseFailure()):
      return {
        ...state,
        success: null,
        loading: false,
        error: action.payload.error ? action.payload.error.message : action.payload.message,
      }
    // Delete Student In Course
    case getType(deleteStudentInCourse.deleteStudentInCourseRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(deleteStudentInCourse.deleteStudentInCourseSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.DELETE,
        loading: false,
        data: state.data.filter((item) => item.student_id !== action.payload.studentId),
        error: null,
      }
    case getType(deleteStudentInCourse.deleteStudentInCourseFailure()):
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

export const lessonDetailsReducers = (state = INIT_STATE.lessonDetails, action) => {
  switch (action.type) {
    // Get Lesson Details
    case getType(getLessonById.getLessonByIdRequest()):
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      }
    case getType(getLessonById.getLessonByIdSuccess()):
      return {
        ...state,
        success: SUCCESS_ACTION_TYPE.LOAD,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case getType(getLessonById.getLessonByIdFailure()):
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
