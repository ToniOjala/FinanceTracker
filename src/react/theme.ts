import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#CBD0C9',
      main: '#66B088',
      dark: '#1B2034',
    },
    secondary: {
      main: '#F48BB1',
    },
    text: {
      primary: '#eeeeee',
      secondary: '#9495C2',
    },
    background: {
      paper: '#303859',
      default: '#242A43',
    },
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected, &$selected:hover": {
          backgroundColor: '#66B088',
        },
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: 'none',
      }
    }
  }
})