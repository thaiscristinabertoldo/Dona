import React from 'react'

import { makeStyles, Typography } from '@material-ui/core'

import logo from 'assets/logo.svg'

const useStyles = makeStyles((theme) => ({
  logotipo: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxHeight: '6rem',
  },
  title: {
    color: theme.palette.grey.fullDark,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: theme.spacing(2),
  },
}))

export const HeaderAuth = ({ title }) => {
  const classes = useStyles()

  return (
    <>
      <img src={logo} alt="Dona" className={classes.logotipo} />

      <Typography className={classes.title}>{title}</Typography>
    </>
  )
}
