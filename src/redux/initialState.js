const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

export const INIT_STATE = {
  users: {
    loading: false,
    data: [],
    error: null,
  },
  userLogin: {
    loading: false,
    data: userInfoFromStorage,
    error: null,
  },
  courses: {
    loading: false,
    data: [],
    error: null,
  },
  courseDetails: {
    loading: false,
    data: null,
    error: null,
  },
  courseLesson: {
    loading: false,
    data: null,
    error: null,
  },
}
