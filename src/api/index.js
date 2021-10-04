import axios from 'axios'

const URL = 'http://localhost:3030'

export const fetchUsers = () => axios.get(`${URL}/api/users`)
