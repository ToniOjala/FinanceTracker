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
      main: '#FF5D73',
    },
    text: {
      primary: '#eeeeee',
      secondary: '#8E90B8',
    },
    background: {
      paper: '#2E3554',
      default: '#242A43',
    },
  },
  zIndex: {
    drawer: 1,
    appBar: 2,
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected, &$selected:hover": {
          backgroundColor: '#66B088BB',
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