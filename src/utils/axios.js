import axios from 'axios'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: 'https://mcoding-edu.onrender.com',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response && error.response.data ? error.response.data : 'Có lỗi xảy ra!'),
)

export default axiosInstance
