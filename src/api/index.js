import axios from 'axios'

const URL = 'http://localhost:3030'

// Users
export const fetchUsers = (payload) => axios.get(`${URL}/api/users`, payload)
export const login = (payload) => axios.post(`${URL}/api/users/login`, payload)

// Courses
export const fetchAllCourses = () => axios.get(`${URL}/api/courses`)
export const addNewCourse = (payload) => axios.post(`${URL}/api/courses`, payload.data, payload.config)
export const fetchCourse = (payload) => axios.get(`${URL}/api/courses/${payload}`)
export const fetchCourseLearning = (payload) => axios.get(`${URL}/api/courses/${payload.data}/lesson`, payload.config)

// Sections
export const addNewSection = (payload) => axios.post(`${URL}/api/sections`, payload.data, payload.config)
export const editSection = (payload) =>
  axios.put(`${URL}/api/sections/${payload.data.id}`, payload.data, payload.config)
export const removeSection = (payload) => axios.delete(`${URL}/api/sections/${payload.id}`, payload.config)

// Lessons
export const addNewLesson = (payload) => axios.post(`${URL}/api/lessons`, payload.data, payload.config)
export const editLesson = (payload) => axios.put(`${URL}/api/lessons/${payload.data.id}`, payload.data, payload.config)
export const removeLesson = (payload) => axios.delete(`${URL}/api/lessons/${payload.id}`, payload.config)
