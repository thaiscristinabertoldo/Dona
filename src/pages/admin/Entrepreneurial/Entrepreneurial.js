import React, { memo, useState, useEffect } from 'react'

import { useAsync } from 'react-async'

import {
  Container,
  Box,
  Typography,
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

import { useDebounce } from 'use-lodash-debounce'

import * as usersApi from 'api/users'
import { EntrepreneurialList } from './EntrepreneurialList'

const useStyles = makeStyles((theme) => ({
  boxHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  title: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(1),
    },
  },

  subtitle: {
    textAlign: 'center',
  },

  boxList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'inherit',
    },
  },

  root: {
    margin: '0 8%',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: 10,
  },

  iconButton: {
    padding: 10,
  },
}))

const Entrepreneurial = memo(() => {
  const classes = useStyles()

  const [users, setUsers] = useState()
  const [filter, setFilter] = useState()

  const { data: dataUsers, isLoading, isFulfilled } = useAsync(usersApi.listAllUsers)

  const debouncedFilter = useDebounce(filter, 500)

  useEffect(() => {
    if (isFulfilled) {
      setUsers(dataUsers)
    }
  }, [isFulfilled, dataUsers])

  useEffect(
    () => {
      if (filter) {
        const userFilter = dataUsers.filter((user) => {
          return user.nome.toLowerCase().includes(filter.toLowerCase())
        })

        return setUsers(userFilter)
      }
      return setUsers(dataUsers)
    }, // eslint-disable-next-line
    [debouncedFilter]
  )

  return (
    <>
      {isLoading && <CircularProgress />}

      <Container>
        <Box className={classes.boxHeader}>
          <Typography className={classes.title} variant="h5">
            Seja bem vinda!
          </Typography>
          <Typography className={classes.subtitle} variant="h6">
            Conheça mulheres incríveis com os mesmos ideais que os seus!
          </Typography>
        </Box>

        <Box>
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Buscar empreendedoras..."
              onChange={(e) => setFilter(e.target.value)}
            />
            <IconButton className={classes.iconButton} disabled>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {users && (
          <Box className={classes.boxList}>
            <EntrepreneurialList items={users} />
          </Box>
        )}
      </Container>
    </>
  )
})

export default Entrepreneurial
