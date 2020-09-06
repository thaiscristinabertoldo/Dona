import React, { useContext, createContext } from 'react'

import { useAsync } from 'react-async'

import CircularProgress from '@material-ui/core/CircularProgress'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('[useAuth]: Deve ser usado dentro de um AuthProvider')
  }

  return context
}

export const AuthProvider = ({ bootstrap, onLogin, onLogout, children }) => {
  const { data, isPending, setData } = useAsync(bootstrap)

  if (isPending) {
    return <CircularProgress />
  }

  const login = (data) => onLogin(data).then(setData)
  const logout = () => onLogout().then(setData)

  const value = {
    eu: data,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
