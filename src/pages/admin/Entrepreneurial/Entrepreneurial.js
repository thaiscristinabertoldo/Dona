import React, { memo, useState } from 'react'

import { Container, Box, Typography, makeStyles, Paper, InputBase, IconButton } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

import { VerticalList } from 'components/VerticalList'

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

const deliverToday = [
  {
    id: '1',
    name: 'Maria Júlia Gomes',
    city: 'Pato Branco, PR',
    bio: 'Apaixonada por educação e tecnologia...',
    phoneNumber: '5546988041760',
    image: 'https://source.unsplash.com/mEZ3PoFGs_k',
  },
  {
    id: '2',
    name: 'Ana Clara Dias',
    city: 'São Paulo, SP',
    conquest: 'Menores preços',
    bio: 'Apaixonada por direitos humanos e tecnologia...',
    phoneNumber: '5546988041760',
    image: 'https://source.unsplash.com/0-ntnQI3NUc',
  },
  {
    id: '3',
    name: 'Marina Letier',
    city: 'Brasília, DF',
    bio: 'Apaixonada por artes plásticas e tecnologia...',
    phoneNumber: '5546988041760',
    image: 'https://source.unsplash.com/Iex31-cnO-o',
  },
]

const Entrepreneurial = memo(() => {
  const classes = useStyles()

  const [, setFilter] = useState()

  return (
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

      <Box className={classes.boxList}>
        <VerticalList items={deliverToday} />
      </Box>
    </Container>
  )
})

export default Entrepreneurial
