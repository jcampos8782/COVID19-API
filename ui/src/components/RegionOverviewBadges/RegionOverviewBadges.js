import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import BadgedIcon from '../BadgedIcon';

export default class RegionOverviewBadges extends React.Component {
  render() {
    const {
      population,
      recovered,
      deathsCount,
      confirmedCount,
      percentChangeDeaths,
      percentChangeConfirmed,
      percentChangeRecovered,
      classes,
      loading
    } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Population"
            iconClass={`${classes.link} fas fa-users`}
            value={loading ? <LinearProgress variant="query" /> : population }
            />
        </Grid>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Recovered"
            iconClass={`${classes.green} fas fa-heartbeat`}
            caption={!loading && <ChangeIcon {...this.props} value={percentChangeRecovered} invertColors />}
            value={loading ? <LinearProgress variant="query" /> : recovered}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Confirmed"
            color="secondary"
            iconClass="fas fa-head-side-cough"
            caption={!loading && <ChangeIcon {...this.props} value={percentChangeConfirmed}/>}
            value={loading ? <LinearProgress variant="query" />: confirmedCount}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Deaths"
            color="error"
            iconClass="fas fa-skull-crossbones"
            caption={!loading && <ChangeIcon {...this.props} value={percentChangeDeaths} />}
            value={loading ? <LinearProgress variant="query" />: deathsCount}
            />
        </Grid>
      </Grid>
    );
  }
}

const ChangeIcon = ({classes, invertColors, value}) => (
  value && <div>
    <Icon className={
      value > 0
        ? `${invertColors ? classes.green : classes.red} ${classes.xsIcon} fas fa-arrow-up xs`
        : `${invertColors ? classes.red: classes.green} ${classes.xsIcon} fas fa-arrow-down xs`
      }
    />
    {value}%
  </div>
)
