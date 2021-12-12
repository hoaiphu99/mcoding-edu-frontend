import axios from '../utils/axios'

const URL = 'http://localhost:3030'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// Users
export const fetchUsers = () => axios.get(`${URL}/api/users`)
export const login = (payload) => axios.post(`${URL}/api/users/login`, payload)
export const register = (payload) => axios.post(`${URL}/api/users`, payload)
export const fetchUserProfile = () => axios.get(`${URL}/api/users/profile`)
export const banUser = (payload) =>
  axios.put(`${URL}/api/users/${payload.username}/banned?isBanned=${payload.isBanned}`)
export const updateUserStatus = (payload) =>
  axios.put(`${URL}/api/users/${payload.username}/status?status=${payload.status}`)
export const updatePassword = (payload) => axios.put(`${URL}/api/users/change-password`, payload)

// Students
export const fetchStudents = () => axios.get(`${URL}/api/students`)
export const banStudent = (payload) =>
  axios.put(`${URL}/api/students/${payload.student_id}/banned?isBanned=${payload.isBanned}`)

// Category
export const fetchCategories = () => axios.get(`${URL}/api/categories`)
export const addCategory = (payload) => axios.post(`${URL}/api/categories`, payload)
export const editCategory = (payload) => axios.put(`${URL}/api/categories/${payload.id}`, payload)
export const removeCategory = (payload) => axios.delete(`${URL}/api/categories/${payload}`)

// Programing Languages
export const fetchPrograming = () => axios.get(`${URL}/api/programing`)

// Courses
export const fetchAllCourses = (payload) => axios.get(`${URL}/api/courses?${payload}`)
export const fetchAllCoursesByCategoryId = (payload) => axios.get(`${URL}/api/courses/category/${payload}?public=true`)
export const addNewCourse = (payload) => axios.post(`${URL}/api/courses`, payload)
export const editCourse = (payload) => axios.put(`${URL}/api/courses/${payload.id}`, payload)
export const removeCourse = (payload) => axios.delete(`${URL}/api/courses/${payload}`)
export const fetchCourse = (payload) => axios.get(`${URL}/api/courses/${payload}`)
export const fetchCourseLesson = (payload) => axios.get(`${URL}/api/courses/${payload}/lesson`)
export const editCourseStatus = (payload) => axios.put(`${URL}/api/courses/${payload.id}/status-update`, payload)
export const fetchMyCourses = () => axios.get(`${URL}/api/courses/my-courses`)
export const fetchStudentsInCourse = (payload) => axios.get(`${URL}/api/courses/${payload}/students`)
export const removeStudentInCourse = (payload) =>
  axios.delete(`${URL}/api/courses/${payload.courseId}/students/${payload.studentId}`)

// Sections
export const addNewSection = (payload) => axios.post(`${URL}/api/sections`, payload)
export const editSection = (payload) => axios.put(`${URL}/api/sections/${payload.id}`, payload)
export const removeSection = (payload) => axios.delete(`${URL}/api/sections/${payload}`)

// Lessons
export const fetchLessonById = (payload) => axios.get(`${URL}/api/lessons/${payload}`)
export const addNewLesson = (payload) => axios.post(`${URL}/api/lessons`, payload)
export const editLesson = (payload) => axios.put(`${URL}/api/lessons/${payload.id}`, payload)
export const removeLesson = (payload) => axios.delete(`${URL}/api/lessons/${payload}`)

// StudentCourse
export const fetchStudentCourseByStudentAndCourseId = (payload) =>
  axios.get(`${URL}/api/student-courses/student/${payload.studentId}/course/${payload.courseId}`)
export const addNewStudentCourse = (payload) => axios.post(`${URL}/api/student-courses`, payload)

// Comment
export const fetchCommentsByLessonID = (payload) => axios.get(`${URL}/api/comments/lesson/${payload}`)
export const addNewComment = (payload) => axios.post(`${URL}/api/comments`, payload)

// Review
export const fetchReviewByCourseID = (payload) => axios.get(`/api/reviews/course/${payload}`)
export const addNewReview = (payload) => axios.post(`/api/reviews`, payload)

// Attachment
export const fetchAttachmentByLessonID = (payload) => axios.get(`${URL}/api/attachments/lesson/${payload}`)
export const addAttachment = (payload) => axios.post(`${URL}/api/attachments`, payload)
export const removeAttachment = (payload) => axios.delete(`${URL}/api/attachments/${payload}`)

// Analytics
export const fetchStudentsInCourseAnalytics = () => axios.get(`${URL}/api/analytics/students-in-course`)
export const countCourseTotalAnalytics = () => axios.get(`${URL}/api/analytics/course-total`)
export const countUserTotalAnalytics = () => axios.get(`${URL}/api/analytics/user-total`)
export const countStudentTotalAnalytics = () => axios.get(`${URL}/api/analytics/student-total`)
export const fetchStudentsAttendedCourseAnalytics = (payload) =>
  axios.get(`${URL}/api/analytics/students-attended-course?${payload}`)

// Assignments
export const fetchAssignmentsByLessonID = (payload) => axios.get(`${URL}/api/assignments/lesson/${payload}`)
export const addAssignments = (payload) => axios.post(`${URL}/api/assignments`, payload)
export const editAssignments = (payload) => axios.put(`${URL}/api/assignments/${payload.id}`, payload)
export const removeAssignments = (payload) => axios.delete(`${URL}/api/assignments/${payload}`)
