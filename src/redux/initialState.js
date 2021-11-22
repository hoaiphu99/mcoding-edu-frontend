// const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

export const INIT_STATE = {
  users: {
    success: false,
    loading: false,
    data: [],
    error: null,
  },
  students: {
    success: false,
    loading: false,
    data: [],
    error: null,
  },
  // userLogin: {
  //   success: false,
  //   loading: false,
  //   data: userInfoFromStorage,
  //   error: null,
  // },
  userProfile: {
    success: false,
    loading: false,
    data: null,
    error: null,
  },
  courses: {
    success: false,
    loading: false,
    data: [],
    error: null,
  },
  courseDetails: {
    success: false,
    loading: false,
    data: null,
    error: null,
  },
  courseLesson: {
    success: false,
    loading: false,
    data: null,
    error: null,
  },
  studentCourse: {
    success: false,
    loading: false,
    data: null,
    error: null,
  },
  comments: {
    success: null,
    loading: false,
    data: [],
    error: null,
  },
  reviews: {
    success: null,
    loading: false,
    data: null,
    error: null,
  },
  coursesMy: {
    success: null,
    loading: false,
    data: [],
    error: null,
  },
  studentsInCourse: {
    success: null,
    loading: false,
    data: [],
    error: null,
  },
  categories: {
    success: null,
    loading: false,
    data: [],
    error: null,
  },
  programLanguages: {
    success: null,
    loading: false,
    data: [],
    error: null,
  },
  attachments: {
    success: null,
    loading: false,
    data: {
      attachments: [],
    },
    error: null,
  },
  lessonDetails: {
    success: null,
    loading: false,
    data: null,
    error: null,
  },
  analytics: {
    success: null,
    loading: false,
    data: {
      studentInCourse: [],
      courseTotal: 0,
      userTotal: 0,
      studentTotal: 0,
      studentsAttendedCourse: [],
    },
    error: null,
  },
}

export const SUCCESS_ACTION_TYPE = {
  LOAD: 'load',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
}
