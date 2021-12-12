import axios from '../utils/axios'

// const URL = 'https://mcoding-edu.herokuapp.com'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// Users
export const fetchUsers = () => axios.get(`/api/users`)
export const login = (payload) => axios.post(`/api/users/login`, payload)
export const register = (payload) => axios.post(`/api/users`, payload)
export const fetchUserProfile = () => axios.get(`/api/users/profile`)
export const banUser = (payload) => axios.put(`/api/users/${payload.username}/banned?isBanned=${payload.isBanned}`)
export const updateUserStatus = (payload) => axios.put(`/api/users/${payload.username}/status?status=${payload.status}`)
export const updatePassword = (payload) => axios.put(`/api/users/change-password`, payload)

// Students
export const fetchStudents = () => axios.get(`/api/students`)
export const banStudent = (payload) =>
  axios.put(`/api/students/${payload.student_id}/banned?isBanned=${payload.isBanned}`)

// Category
export const fetchCategories = () => axios.get(`/api/categories`)
export const addCategory = (payload) => axios.post(`/api/categories`, payload)
export const editCategory = (payload) => axios.put(`/api/categories/${payload.id}`, payload)
export const removeCategory = (payload) => axios.delete(`/api/categories/${payload}`)

// Programing Languages
export const fetchPrograming = () => axios.get(`/api/programing`)

// Courses
export const fetchAllCourses = (payload) => axios.get(`/api/courses?${payload}`)
export const fetchAllCoursesByCategoryId = (payload) => axios.get(`/api/courses/category/${payload}?public=true`)
export const addNewCourse = (payload) => axios.post(`/api/courses`, payload)
export const editCourse = (payload) => axios.put(`/api/courses/${payload.id}`, payload)
export const removeCourse = (payload) => axios.delete(`/api/courses/${payload}`)
export const fetchCourse = (payload) => axios.get(`/api/courses/${payload}`)
export const fetchCourseLesson = (payload) => axios.get(`/api/courses/${payload}/lesson`)
export const editCourseStatus = (payload) => axios.put(`/api/courses/${payload.id}/status-update`, payload)
export const fetchMyCourses = () => axios.get(`/api/courses/my-courses`)
export const fetchStudentsInCourse = (payload) => axios.get(`/api/courses/${payload}/students`)
export const removeStudentInCourse = (payload) =>
  axios.delete(`/api/courses/${payload.courseId}/students/${payload.studentId}`)

// Sections
export const addNewSection = (payload) => axios.post(`/api/sections`, payload)
export const editSection = (payload) => axios.put(`/api/sections/${payload.id}`, payload)
export const removeSection = (payload) => axios.delete(`/api/sections/${payload}`)

// Lessons
export const fetchLessonById = (payload) => axios.get(`/api/lessons/${payload}`)
export const addNewLesson = (payload) => axios.post(`/api/lessons`, payload)
export const editLesson = (payload) => axios.put(`/api/lessons/${payload.id}`, payload)
export const removeLesson = (payload) => axios.delete(`/api/lessons/${payload}`)

// StudentCourse
export const fetchStudentCourseByStudentAndCourseId = (payload) =>
  axios.get(`/api/student-courses/student/${payload.studentId}/course/${payload.courseId}`)
export const addNewStudentCourse = (payload) => axios.post(`/api/student-courses`, payload)

// Comment
export const fetchCommentsByLessonID = (payload) => axios.get(`/api/comments/lesson/${payload}`)
export const addNewComment = (payload) => axios.post(`/api/comments`, payload)

// Review
export const fetchReviewByCourseID = (payload) => axios.get(`/api/reviews/course/${payload}`)
export const addNewReview = (payload) => axios.post(`/api/reviews`, payload)

// Attachment
export const fetchAttachmentByLessonID = (payload) => axios.get(`/api/attachments/lesson/${payload}`)
export const addAttachment = (payload) => axios.post(`/api/attachments`, payload)
export const removeAttachment = (payload) => axios.delete(`/api/attachments/${payload}`)

// Analytics
export const fetchStudentsInCourseAnalytics = () => axios.get(`/api/analytics/students-in-course`)
export const countCourseTotalAnalytics = () => axios.get(`/api/analytics/course-total`)
export const countUserTotalAnalytics = () => axios.get(`/api/analytics/user-total`)
export const countStudentTotalAnalytics = () => axios.get(`/api/analytics/student-total`)
export const fetchStudentsAttendedCourseAnalytics = (payload) =>
  axios.get(`/api/analytics/students-attended-course?${payload}`)

// Assignments
export const fetchAssignmentsByLessonID = (payload) => axios.get(`/api/assignments/lesson/${payload}`)
export const addAssignments = (payload) => axios.post(`/api/assignments`, payload)
export const editAssignments = (payload) => axios.put(`/api/assignments/${payload.id}`, payload)
export const removeAssignments = (payload) => axios.delete(`/api/assignments/${payload}`)
