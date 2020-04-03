import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import BottomNav from '../BottomNav';
import Dashboard from '../Dashboard';
import Filters from '../Filters';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

export default class App extends React.Component {
    componentDidMount() {
        Promise.all([this.props.fetchRegions(), this.props.fetchSeriesList()])
          .then(r => {
            if(this.props.isGeolocationAvailable) {
              this.props.fetchGeolocation().then(r => {
                this.props.fetchDefaultSeries();
              })
            }
          });
    }

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={createMuiTheme({ palette: { type: 'light'  }})}>
              <CssBaseline />
              <AppBar position='fixed'>
                <Toolbar>
                  <Grid container alignItems="center" justify="flex-end" spacing={1} >
                    <IconButton className={classes.navLink} aria-label="github" onClick={() => window.open('http://github.com/jcampos8782/covid19-api')}>
                        <Icon className="fab fa-github" />
                    </IconButton>
                    <IconButton className={classes.navLink} aria-label="linkedin" onClick={() => window.open('https://linkedin.com/in/json-campos')}>
                        <Icon className="fab fa-linkedin" />
                    </IconButton>
                    <IconButton className={classes.navLink} aria-label="github" onClick={() => window.open('https://www.facebook.com/jcampos8782')}>
                        <Icon className="fab fa-facebook-square" />
                    </IconButton>
                  </Grid>
                </Toolbar>
              </AppBar>
              <Backdrop open={this.props.loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <Grid container className={classes.body}>
                <Filters />
              </Grid>
              <Grid container className={classes.body}>
                <Dashboard />
              </Grid>
              <BottomNav/>
            </ThemeProvider>
        );
    }
}
