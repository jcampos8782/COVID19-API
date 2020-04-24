import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import BadgedIcon from '../BadgedIcon';

export default class RegionOverviewBadges extends React.Component {
  render() {
    const {
      admitted,
      intensiveCare,
      onVentilator,
      loading
    } = this.props;

    return (
      <Grid container style={{paddingBottom: 20}}>
        <Grid item xs={12}>
          <Typography variant="h6">Hospitalizations</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline">Current/Cumulative</Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <BadgedIcon
            title="Admitted"
            color="error"
            iconClass="fas fa-clinic-medical"
            value={ loading ? <LinearProgress variant="query" /> : admitted }
            />
        </Grid>
        <Grid item xs={6} sm={4}>
          <BadgedIcon
            title="Intensive Care"
            color="error"
            iconClass="fas fa-procedures"
            value={ loading ? <LinearProgress variant="query" /> : intensiveCare }
            />
        </Grid>
        <Grid item xs={6} sm={4}>
          <BadgedIcon
            title="Ventiliator"
            color="error"
            iconClass="fas fa-lungs-virus"
            value={ loading ? <LinearProgress variant="query" /> : onVentilator }
            />
        </Grid>
      </Grid>
    );
  }
}
