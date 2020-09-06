import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: (props) => props.color,
    color: theme.palette.background.default,
    borderRadius: '5px',
    padding: '0',
  },
}))

export const CustomChip = ({ color, label, onClick, ...props }) => {
  const classes = useStyles({ color })

  return <Chip className={classes.main} onClick={onClick} label={label} {...props} />
}
