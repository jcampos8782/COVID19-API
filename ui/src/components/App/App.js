import React from 'react';


import AppBar from '@material-ui/core/AppBar';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import BottomNav from '../BottomNav';
import Dashboard from '../Dashboard';
import Filters from '../Filters';

import { light, dark } from '../../styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

export default class App extends React.Component {
    componentDidMount() {
      const {cookies} = this.props;
      if (cookies.cookies.theme) {
          this.props.selectTheme(cookies.cookies.theme);
      }

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
        const { classes, theme } = this.props;

        let themeIconClass = theme === 'light' ? 'far fa-lightbulb' : 'fas fa-lightbulb';
        return (
          <MuiThemeProvider theme={theme === 'light' ? light : dark}>
            <CssBaseline />
            <AppBar className={classes.appbar} position='fixed'>
              <Toolbar>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.navButton}
                  aria-label="Donate"
                  startIcon={<Icon className="fab fa-paypal" />}
                  onClick={() => window.open('https://paypal.me/JasonCampos')}>
                  Donate
                </Button>
                <IconButton className={classes.navLink} aria-label="theme" onClick={() => this.props.toggleTheme(this.props.cookies)}>
                    <Icon className={themeIconClass} />
                </IconButton>
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
            <Backdrop open={this.props.loading} className={classes.backdrop}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container className={classes.body} alignItems="flex-start" justify="flex-start">
              <Filters/>
            </Grid>
            <Grid container className={classes.body}>
              <Dashboard />
            </Grid>
            <BottomNav/>
          </MuiThemeProvider>
        );
    }
}
