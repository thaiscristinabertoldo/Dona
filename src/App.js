import React, { lazy, Suspense, useMemo } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

import { useAuth } from 'providers/auth'

const Auth = lazy(() => import('pages/auth'))
const Admin = lazy(() => import('pages/admin'))

const App = () => {
  const { userAuthenticated } = useAuth()

  const Component = useMemo(() => {
    if (!userAuthenticated) {
      return Auth
    }

    return Admin
  }, [userAuthenticated])

  return (
    <Suspense fallback={<CircularProgress />}>
      <Component />
    </Suspense>
  )
}

export default App
