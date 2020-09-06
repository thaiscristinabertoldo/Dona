import React, { lazy, Suspense, useMemo } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

const Auth = lazy(() => import('pages/auth'))
const Admin = lazy(() => import('pages/admin'))

const App = () => {
  // const { eu } = useAuth()

  const eu = true

  const Component = useMemo(() => {
    if (!eu) {
      return Auth
    }

    return Admin
  }, [eu])

  return (
    <Suspense fallback={<CircularProgress />}>
      <Component />
    </Suspense>
  )
}

export default App
