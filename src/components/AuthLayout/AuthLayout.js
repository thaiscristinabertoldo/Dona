import React from 'react'

import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'

import background from 'assets/background.svg'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.common.white,
      [theme.breakpoints.up('md')]: {
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
      },
    },
  },

  paper: {
    marginTop: theme.spacing(4),
  },
}))

export const AuthLayout = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.paper}>{children}</div>
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
