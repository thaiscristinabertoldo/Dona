import { useContext } from 'react'

import { SnackbarContext } from 'react-snackbar-alert'

export function useSnackbar() {
  const context = useContext(SnackbarContext)

  if (context === undefined) {
    throw new Error('Must be used within a SnackbarProvider')
  }

  return context
}
