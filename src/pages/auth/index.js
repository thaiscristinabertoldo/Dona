import React, { lazy, Suspense } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'

import { AuthLayout } from 'components/AuthLayout/AuthLayout'

import theme from 'theme/theme'

const Login = lazy(() => import('./Login/Login'))
const RecoverPassword = lazy(() => import('./RecoverPassword/RecoverPassword'))
const CreateAccount = lazy(() => import('./CreateAccount/CreateAccount'))

const Auth = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <AuthLayout>
          <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/recover-password" component={RecoverPassword} />
            <Route path="/auth/create-account" component={CreateAccount} />
            <Route render={() => <Redirect to="/auth/login" />} />
          </Switch>
        </AuthLayout>
      </Suspense>
    </ThemeProvider>
  )
}

export default Auth
