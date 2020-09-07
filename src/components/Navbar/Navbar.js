import React, { useState, memo, useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import logo from 'assets/logo.svg'

import { useAuth } from 'providers/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logotipo: {
    height: '2.5rem',
  },
}))

export const Navbar = memo(({ onClickMenu }) => {
  const classes = useStyles()

  const history = useHistory()

  const { logout } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = useCallback(() => {
    handleClose()
    history.push('/admin/profile')
  }, [history])

  const handleLogout = useCallback(() => {
    handleClose()
    logout().then(() => {
      history.push('/auth/login')
    })
  }, [logout, history])

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => onClickMenu(true)}
        >
          <MenuIcon />
        </IconButton>
        <Box width={1} display="flex" flexDirection="column" alignContent="center" alignItems="center">
          <img src={logo} alt="Dona" className={classes.logotipo} />
        </Box>
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleClick}>
          <AccountCircle />
        </IconButton>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <Typography variant="inherit">Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Typography variant="inherit">Sair</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
})
