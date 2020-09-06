import React, { memo } from 'react'

import { Box } from '@material-ui/core'

const Content = memo(({ children, title }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box>{title}</Box>
      <Box>{children}</Box>
    </Box>
  )
})

export default Content
