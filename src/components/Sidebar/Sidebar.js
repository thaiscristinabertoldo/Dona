import React, { memo, useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import clsx from 'clsx'

import { List, Drawer, ListItem, ListItemText, ListItemIcon, Icon, makeStyles, Divider } from '@material-ui/core'

import logo from 'assets/logo.svg'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },

  listItemLogo: {
    display: 'flex',
    justifyContent: 'center',
  },

  logotipo: {
    height: '4rem',
  },
}))

const Sidebar = memo(({ open, onOpen, routes }) => {
  const history = useHistory()
  const classes = useStyles()

  const handleRoute = useCallback(
    (route) => {
      history.push(`${route}`)
      onOpen(false)
    },
    [history, onOpen]
  )

  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      anchor="left"
      open={open}
      onClose={() => onOpen(!open)}
    >
      <List>
        <ListItem className={classes.listItemLogo}>
          <img src={logo} alt="Dona" className={classes.logotipo} />
        </ListItem>

        <Divider />

        {routes &&
          routes.map((route) => (
            <ListItem button key={route.name} onClick={() => handleRoute(route.path)}>
              <ListItemIcon color="primary">
                <Icon>{route.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  )
})

export default Sidebar
