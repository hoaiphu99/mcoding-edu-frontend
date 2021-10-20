import { INIT_STATE } from '../initialState'
import {
  getType,
  getAllCourses,
  createCourse,
  getCourseDetails,
  getCourseLesson,
  createSection,
  updateSection,
  deleteSection,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../actions'

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
        error: null,
      }
    case getType(getAllCourses.getAllCoursesFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error.message,
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
        error: null,
      }
    case getType(createCourse.createCourseFailure()):
      return {
        ...state,
        loading: false,
        error: action.payload.error.message,
      }

    default:
      return state
  }
}

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
        error: action.payload.error.message,
      }
    default:
      return state
  }
}

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
        error: action.payload.error.message,
      }
    // Create Section
    case getType(createSection.createSectionRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(createSection.createSectionSuccess()): {
      const newData = { ...state.data }
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
        error: action.payload.error.message,
      }
    // Update Section
    case getType(updateSection.updateSectionRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(updateSection.updateSectionSuccess()): {
      const newData = { ...state.data }
      newData.sections = newData.sections.map((item) => {
        if (item.section_id === action.payload.data.section_id) {
          item = action.payload.data
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
        error: action.payload.error.message,
      }
    // Delete Section
    case getType(deleteSection.deleteSectionRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(deleteSection.deleteSectionSuccess()): {
      const newData = { ...state.data }
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
        error: action.payload.error.message,
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
      const newData = { ...state.data }
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
        loading: false,
        error: action.payload.error.message,
      }
    // Update Lesson
    case getType(updateLesson.updateLessonRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(updateLesson.updateLessonSuccess()): {
      const newData = { ...state.data }
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
        error: action.payload.error.message,
      }
    // Delete Lesson
    case getType(deleteLesson.deleteLessonRequest()):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case getType(deleteLesson.deleteLessonSuccess()): {
      const newData = { ...state.data }
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
