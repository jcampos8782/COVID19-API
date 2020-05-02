import { createMuiTheme } from '@material-ui/core/styles';

import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const base = createMuiTheme({palette: {type: 'dark'}});

export default createMuiTheme(base, {
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[800],
      linkText: '#8dd3c7'
    },
    secondary: {
      main: "#ff5722"
    },
    success: {
      main: green[600]
    },
    warn: {
      main: orange[400]
    },
    error: {
      main: red[600]
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    nivo: {
      bar: {
        colors: 'set3',
        text: 'white'
      },
      heatmap: {
        colors: {
          emptyColor: base.palette.background.default,
          spectrum: [
            '#66c2a5',
            '#8dd3c7',
            '#fcffb3',
            '#f3b462',
            '#f08072'
          ]
        }
      },
      pie: {
        colors: 'dark2',
        text: 'white'
      },
      line: {
        colors: 'set3',
        text: 'white'
      },
      calendar: {
        // set3 colors
        colors: [
          '#8dd3c7',
          '#fcffb3',
          '#f3b462',
          '#f08072'
        ],
        dayBorderColor: grey[600],
        monthBorderColor: grey[600],
        emptyColor: base.palette.background.default,
        text: base.palette.text.primary
      }
    }
  }
});
