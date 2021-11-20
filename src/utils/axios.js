import axios from 'axios'

// ----------------------------------------------------------------------

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response && error.response.data ? error.response.data : 'Có lỗi xảy ra!'),
)

export default axiosInstance
