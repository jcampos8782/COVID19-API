import React from 'react';

import AppBar from '@material-ui/core/BottomNavigation';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class BottomNav extends React.Component {

  render() {
    return (
      <AppBar position='fixed' className={this.props.classes.root}>
        <Toolbar>
          <Grid container alignItems="center" justify="center" spacing={3} >
            <Grid alignItems="center" item xs={12}>
              <Typography variant="overline">
                &copy; Copyright 2020 Jason Campos
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
