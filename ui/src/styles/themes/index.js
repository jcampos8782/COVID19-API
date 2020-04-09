import { createMuiTheme } from '@material-ui/core/styles';

import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange'

export const light = createMuiTheme({
  palette: {
    type: 'light',
    secondary: {
      main: orange[400]
    },
    primary: {
      main: blueGrey[600]
    }
  }
});


export const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[800],
      action: {
        main: '#ff7f50'
      },
      cards: {
        secondary: {
          main: '#696969'
        }
      }
    }
  }
});
