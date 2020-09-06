import { createMuiTheme } from '@material-ui/core/styles'
import { grey, blue, red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
      contrastText: '#fff',
    },
    secondary: {
      main: grey[900],
      contrastText: '#fff',
    },
    red: {
      main: red[400],
    },
    grey: {
      main: grey,
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif !important',
    fontWeightBold: 500,
    fontWeightMedium: 400,
  },
})

export default theme
