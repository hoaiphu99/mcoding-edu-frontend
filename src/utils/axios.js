import axios from 'axios'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  // baseURL: 'https://mcoding-edu.herokuapp.com',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response && error.response.data ? error.response.data : 'Có lỗi xảy ra!'),
)

export default axiosInstance
