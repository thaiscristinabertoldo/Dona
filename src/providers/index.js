import React, { useLayoutEffect } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { SnackbarProvider } from 'react-snackbar-alert'

import CssBaseline from '@material-ui/core/CssBaseline'

import http from 'api'

import * as authService from 'services/auth'

import { AuthProvider } from './auth'

// adiciona token de autorização
http.interceptors.request.use(function (config) {
  const token = authService.getToken()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

// verifica quando ocorrer erro de autenticação
http.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    console.log('http error: ', error)
    return Promise.reject(error)
  }
)

const Providers = ({ children }) => {
  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const token = params.get('token')

    if (token) {
      authService.setToken(token)
    }

    window.history.replaceState({}, document.title, `${window.location.origin}${window.location.pathname}`)
  }, [])

  return (
    <SnackbarProvider position="bottom" progressBar={false}>
      <CssBaseline />
      <AuthProvider bootstrap={authService.bootstrap} onLogin={authService.login} onLogout={authService.logout}>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default Providers
