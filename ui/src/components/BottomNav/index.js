import BottomNav from './BottomNav.js';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0%'
  }
})

export default withStyles(styles)(BottomNav);
