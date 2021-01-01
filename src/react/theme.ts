import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#CBD0C9',
      main: '#69927B',
    },
    background: {
      paper: '#424242',
      default: '#303030'
    }
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected, &$selected:hover": {
          backgroundColor: '#69927B',
        },
      }
    }
  }
})