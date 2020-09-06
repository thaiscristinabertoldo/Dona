import React, { useCallback, memo } from 'react'

import {
  makeStyles,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  IconButton,
  CardActionArea,
  Button,
} from '@material-ui/core'

import FavoriteIcon from '@material-ui/icons/Favorite'

import theme from 'theme/theme'
import whatsapp from 'assets/whatsapp.svg'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    maxWidth: '300px',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(2),
    },
  },

  img: {
    height: '300px',
    width: '300px',
  },

  title: {
    fontWeight: theme.typography.fontWeightBold,
  },

  box: {
    cursor: 'pointer',
  },

  boxWhatsApp: {
    padding: theme.spacing(2),
  },

  boxActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
}))

const WhatsAppIcon = memo(() => {
  return <img src={whatsapp} alt="WhatsApp" width="30px" />
}, [])

export const VerticalList = memo(({ items }) => {
  const classes = useStyles()

  const onClick = useCallback((id) => {
    console.log(id)
  }, [])

  const formatWhatsAppLink = useCallback((phoneNumber, name) => {
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá ${name}! Tudo bem?`
  }, [])

  return items.map((item, index) => (
    <Card key={index} className={classes.main}>
      <Box className={classes.box} onClick={() => onClick(item.id)}>
        <CardActionArea>
          <img className={classes.img} alt={item.description} src={item.image} />
        </CardActionArea>
        <CardContent>
          <Box>
            <Typography variant="subtitle2" className={classes.title}>
              {item.name}
            </Typography>
            <Typography variant="subtitle2">{item.city}</Typography>
            <Typography variant="subtitle2">{item.bio}</Typography>
          </Box>
        </CardContent>
      </Box>

      <Box className={classes.boxWhatsApp}>
        <a href={formatWhatsAppLink(item.phoneNumber, item.name)} rel="noopener noreferrer" target="_blank">
          <Button fullWidth variant="outlined" startIcon={<WhatsAppIcon />}>
            Enviar mensagem
          </Button>
        </a>
      </Box>

      <CardActions className={classes.boxActions}>
        <Tooltip title={'Seguir'}>
          <IconButton
            component="div"
            onClick={() => {
              console.log('clicou')
            }}
          >
            <FavoriteIcon style={{ color: theme.palette.red.main }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  ))
})
