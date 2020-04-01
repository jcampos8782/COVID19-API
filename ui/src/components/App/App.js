import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import Dashboard from '../Dashboard';
import Filters from '../Filters';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

export default class App extends React.Component {
    componentDidMount() {
        Promise.all([this.props.fetchRegions(), this.props.fetchSeriesList()])
          .then(r => this.props.isGeolocationAvailable && this.props.fetchGeolocation());
    }

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={createMuiTheme({ palette: { type: 'light'  }})}>
              <CssBaseline />
              <AppBar position='fixed'>
                <Toolbar>
                  <Grid container alignItems="center" justify="flex-end" spacing={1} >
                    <IconButton aria-label="github" onClick={() => window.open('http://github.com/jcampos8782/covid19-api')}>
                        <Icon className='fab fa-github'  />
                    </IconButton>
                  </Grid>
                </Toolbar>
              </AppBar>
              <Container className={classes.body}>
                <Filters />
                <Container>
                  <Dashboard />
                </Container>
              </Container>
            </ThemeProvider>
        );
    }
}
