import TimeSeriesHeatMap from './TimeSeriesHeatMap';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  green: {
    color: theme.palette.success.light
  },
  red: {
    color: theme.palette.error.dark
  },
  xsIcon: {
    fontSize: '1em'
  }
})

export default withStyles(styles)(TimeSeriesHeatMap);
