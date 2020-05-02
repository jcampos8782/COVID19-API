import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const base = createMuiTheme({palette: { type: 'light'}});

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: blueGrey[600],
    },
    secondary: {
      main: "#ffab91"
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
    contrastThreshold: 3,
    tonalOffset: 0.2,
    nivo: {
      bar: {
        colors: 'paired',
        text: 'black'
      },
      heatmap: {
        colors: {
          emptyColor: base.palette.background.default,
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
        emptyColor: base.palette.background.default,
        text: base.palette.text.primary
      }
    }
  }
});
