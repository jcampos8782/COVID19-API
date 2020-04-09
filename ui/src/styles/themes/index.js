import { createMuiTheme } from '@material-ui/core/styles';

import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange'

export const light = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: blueGrey[600]
    },
    secondary: {
      main: orange[400]
    }
  }
});


export const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: orange[600]
    }
  }
});
