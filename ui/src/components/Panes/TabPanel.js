import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default class TabPanel extends React.Component {

  render() {
    const { children, value, index } = this.props;
    return (
      <Paper
        variant="outlined"
        elevation={3}
        style={{
          padding: 20,
          display: value !== index ? 'none' : ''
        }}>
          <Grid
            role="tabpanel"
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            >
              {children}
          </Grid>
      </Paper>
    );
  }
}
