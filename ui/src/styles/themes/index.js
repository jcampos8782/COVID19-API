import { createMuiTheme } from '@material-ui/core/styles';

import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const lightBase = createMuiTheme({palette: { type: 'light'}});
const darkBase = createMuiTheme({palette: {type: 'dark'}});

export const light = createMuiTheme(lightBase, {
  palette: {
    type: 'light',
    primary: {
      main: blueGrey[600],
    },
    secondary: {
      main: "#f48fb1"
    },
    success: {
      main: green[600]
    },
    warn: {
      main: orange[400]
    },
    error: {
      main: red[800]
    },
    nivo: {
      bar: {
        colors: 'paired',
        text: 'black'
      },
      heatmap: {
        colors: {
          emptyColor: lightBase.palette.background.default,
          spectrum: [
            '#66c2a5',
            '#3977b4',
            '#fcff99',
            '#f5c086',
            '#d9241e'
          ]
        }
      },
      pie: {
        colors: 'set2',
        text: 'black'
      },
      line: {
        colors: 'category10',
        text: 'black'
      },
      calendar: {
        // category10 colors
        colors: [
          '#66c2a5',
          '#fcff99',
          '#f5c086',
          '#d9241e'
        ],
        dayBorderColor: grey[300],
        monthBorderColor: grey[300],
        emptyColor: lightBase.palette.background.default,
        text: lightBase.palette.text.primary
      }
    }
  }
});


export const dark = createMuiTheme(darkBase, {
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[800],
      linkText: '#8dd3c7'
    },
    success: {
      main: green[600]
    },
    warn: {
      main: orange[400]
    },
    error: {
      main: red[800]
    },
    nivo: {
      bar: {
        colors: 'set3',
        text: 'white'
      },
      heatmap: {
        colors: {
          emptyColor: darkBase.palette.background.default,
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
        emptyColor: darkBase.palette.background.default,
        text: darkBase.palette.text.primary
      }
    }
  }
});
