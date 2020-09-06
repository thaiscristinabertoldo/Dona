import React, { lazy, Suspense } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'

import { routes } from 'constants/routes'

import theme from 'theme/theme'
import AdminLayout from 'components/AdminLayout/AdminLayout'

const Entrepreneurial = lazy(() => import('./Entrepreneurial/Entrepreneurial'))
const Profile = lazy(() => import('./Profile/Profile'))
const Forum = lazy(() => import('./Forum/Forum'))

const Admin = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <AdminLayout routes={routes}>
          <Switch>
            <Route path="/admin/entrepreneurial" component={Entrepreneurial} />
            <Route path="/admin/forum" component={Forum} />
            <Route path="/admin/profile" component={Profile} />

            <Route render={() => <Redirect to="/admin/entrepreneurial" />} />
          </Switch>
        </AdminLayout>
      </Suspense>
    </ThemeProvider>
  )
}

export default Admin
