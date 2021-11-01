import { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
// utils
import axios from '../utils/axios'
import { isValidToken, setSession } from '../utils/jwt'

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  UPDATE_PROFILE: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      user,
    }
  },
}

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state)

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

AuthProvider.propTypes = {
  children: PropTypes.node,
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)

          const response = await axios.get('/api/users/profile')
          const { data } = response.data

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: data,
            },
          })
        } else {
          console.log('🚀 ~ file: jwtContext.js ~ line 83 ~ initialize ~ accessToken')
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
    const response = await axios.post('/api/users/login', {
      username,
      password,
    })
    const { data } = response.data
    console.log('🚀 ~ file: jwtContext.js ~ line 117 ~ login ~ data', data)

    setSession(data.token)
    dispatch({
      type: 'LOGIN',
      payload: {
        user: data,
      },
    })
  }

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/users/register', {
      email,
      password,
      firstName,
      lastName,
    })
    const { accessToken, user } = response.data

    window.localStorage.setItem('accessToken', accessToken)
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    })
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  const resetPassword = () => {}

  const updateProfile = async ({ name, email, phone, avatarUrl, education, job, skill }) => {
    const payload = {
      name,
      email,
      phone,
      avatar_url: avatarUrl,
      education,
      job,
      skill,
    }
    const response = await axios.put(`/api/users/${state.user.username}`, payload)
    const { data } = response.data

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        user: data,
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
