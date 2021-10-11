import axios from 'axios'

const URL = 'http://localhost:3030'

// Users
export const fetchUsers = (payload) => axios.get(`${URL}/api/users`, payload)
export const login = (payload) => axios.post(`${URL}/api/users/login`, payload)

// Courses
export const fetchAllCourses = () => axios.get(`${URL}/api/courses`)
export const addNewCourse = (payload) => axios.post(`${URL}/api/courses`, payload.data, payload.config)
export const fetchCourse = (payload) => axios.get(`${URL}/api/courses/${payload}`)
