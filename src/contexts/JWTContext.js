import { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
// utils
import axios from '../utils/axios'
import { isValidToken, setSession, getDecodedToken } from '../utils/jwt'

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null,
  success: false,
  isVerified: false,
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      error: null,
      success: false,
    }
  },
  LOGIN: (state, action) => {
    const { user, isVerified } = action.payload
    console.log('🚀 ~ file: JWTContext.js ~ line 32 ~ isVerified', isVerified)

    return {
      ...state,
      isAuthenticated: true,
      user,
      success: true,
      isVerified,
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    success: true,
    isVerified: false,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
      success: true,
    }
  },
  UPDATE_PROFILE: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      user,
      success: true,
    }
  },
  ERROR: (state, action) => {
    const { error } = action.payload

    return {
      ...state,
      error,
      success: false,
    }
  },
  RESET_ERROR: (state) => ({
    ...state,
    error: null,
    success: false,
  }),
}

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state)

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  loginVerify: () => Promise.resolve(),
  studentLogin: () => Promise.resolve(),
  studentLoginVerify: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  studentRegister: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  updateProfileStudent: () => Promise.resolve(),
})

AuthProvider.propTypes = {
  children: PropTypes.node,
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: 'RESET_ERROR',
    })
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        setSession(accessToken)

        if (accessToken && isValidToken(accessToken)) {
          const { id } = getDecodedToken(accessToken)

          if (Number.isInteger(id)) {
            const response = await axios.get('/api/students/profile')
            const { data } = response.data

            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user: data,
              },
            })
          } else {
            const response = await axios.get('/api/users/profile')
            const { data } = response.data

            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user: data,
              },
            })
          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialize()
  }, [])

  const login = async (username, password) => {
    await axios
      .post('/api/users/login', {
        username,
        password,
      })
      .then((response) => {
        dispatch({
          type: 'RESET_ERROR',
        })
        const { data, is2fa } = response.data
        let isVerified = false
        if (!is2fa) {
          setSession(data.access_token)
          isVerified = true
        }

        dispatch({
          type: 'LOGIN',
          payload: {
            user: data,
            isVerified,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  const loginVerify = async (username, code) => {
    await axios
      .post('/api/users/login/verify', {
        username,
        code,
      })
      .then((response) => {
        dispatch({
          type: 'RESET_ERROR',
        })
        const { data } = response.data
        setSession(data.access_token)
        dispatch({
          type: 'LOGIN',
          payload: {
            user: data,
            isVerified: true,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  const studentLogin = async (email, password) => {
    await axios
      .post('/api/students/login', {
        email,
        password,
      })
      .then((response) => {
        dispatch({
          type: 'RESET_ERROR',
        })
        const { data, is2fa } = response.data
        let isVerified = false
        if (!is2fa) {
          setSession(data.access_token)
          isVerified = true
        }

        dispatch({
          type: 'LOGIN',
          payload: {
            user: data,
            isVerified,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  const studentLoginVerify = async (email, code) => {
    await axios
      .post('/api/students/login/verify', {
        email,
        code,
      })
      .then((response) => {
        dispatch({
          type: 'RESET_ERROR',
        })
        const { data } = response.data
        setSession(data.access_token)
        dispatch({
          type: 'LOGIN',
          payload: {
            user: data,
            isVerified: true,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  const register = async (payload) => {
    // const data = {
    //   email,
    //   password,
    //   username,
    //   name,
    //   phone,
    //   jobs,
    //   skills,
    //   isAdmin,
    //   avatarUrl,
    // }
    await axios
      .post('/api/users', payload)
      .then((response) => {
        const { data } = response.data

        window.localStorage.setItem('accessToken', data.access_token)
        setSession(data.access_token)
        dispatch({
          type: 'REGISTER',
          payload: {
            user: null,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  const studentRegister = async (payload) => {
    await axios
      .post('/api/students', payload)
      .then((response) => {
        const { data } = response.data

        window.localStorage.setItem('accessToken', data.access_token)
        setSession(data.access_token)
        dispatch({
          type: 'REGISTER',
          payload: {
            user: data,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
    dispatch({
      type: 'RESET_ERROR',
    })
  }

  const resetPassword = () => {}

  const updateProfile = async ({ name, email, phone, avatarUrl, jobs, skills, is2fa }) => {
    const payload = {
      name,
      email,
      phone,
      avatar_url: avatarUrl,
      jobs,
      skills,
      is_2fa: is2fa,
    }

    await axios
      .put(`/api/users/${state.user.username}`, payload)
      .then((response) => {
        const { data } = response.data

        dispatch({
          type: 'UPDATE_PROFILE',
          payload: {
            user: data,
          },
        })

        dispatch({
          type: 'RESET_ERROR',
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  const updateProfileStudent = async ({ name, phone, avatarUrl, education, is2fa }) => {
    const payload = {
      name,
      phone,
      avatar_url: avatarUrl,
      education,
      is_2fa: is2fa,
    }
    await axios
      .put(`/api/students/${state.user.student_id}`, payload)
      .then((response) => {
        const { data } = response.data

        dispatch({
          type: 'UPDATE_PROFILE',
          payload: {
            user: data,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error.message,
          },
        })
        dispatch({
          type: 'RESET_ERROR',
        })
      })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        loginVerify,
        studentLogin,
        studentLoginVerify,
        logout,
        register,
        studentRegister,
        resetPassword,
        updateProfile,
        updateProfileStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
