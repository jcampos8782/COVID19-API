import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';

import Dashboard from '../Dashboard';
import Errors from '../Errors';

import { light, dark } from '../../styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

export default class App extends React.Component {
    componentDidMount() {
      const {cookies, start} = this.props;
      if (cookies.cookies.theme) {
          this.props.setTheme(cookies.cookies.theme);
      }
      start(this.props);
    }

    render() {
        const { classes, theme } = this.props;

        let themeIconClass = theme === 'light' ? 'far fa-lightbulb' : 'fas fa-lightbulb';
        return (
          <MuiThemeProvider theme={theme === 'light' ? light : dark}>
            <CssBaseline />
            <AppBar className={classes.appbar} position='fixed'>
              <Toolbar>
                <Icon className={themeIconClass} />
                <Switch
                  checked={theme === 'light'}
                  onChange={() => this.props.toggleTheme(this.props.cookies)}
                  />
                <Grid container alignItems="center" justify="flex-end" spacing={1} >
                  <IconButton className={classes.navLink} aria-label="github" onClick={() => window.open('mailto:jason@jsoncampos.com')}>
                      <Icon className="far fa-envelope" />
                  </IconButton>
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
            <Grid container className={classes.body}>
              <Errors />
              <Dashboard />
            </Grid>
          </MuiThemeProvider>
        );
    }
}
