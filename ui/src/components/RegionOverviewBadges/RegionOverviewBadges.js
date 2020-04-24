import React from 'react';

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
      classes
    } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Population"
            iconClass={`${classes.link} fas fa-users`}
            value={population || '-'}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Recovered"
            iconClass={`${classes.green} fas fa-heartbeat`}
            value={recovered || '-'}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Confirmed"
            color="secondary"
            iconClass="fas fa-head-side-cough"
            caption={<ChangeIcon {...this.props} value={percentChangeConfirmed} />}
            value={confirmedCount}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
          <BadgedIcon
            title="Deaths"
            color="error"
            iconClass="fas fa-skull-crossbones"
            caption={<ChangeIcon {...this.props} value={percentChangeDeaths} />}
            value={deathsCount}
            />
        </Grid>
      </Grid>
    );
  }
}

const ChangeIcon = ({classes,value}) => (
  value && <div>
    <Icon className={
      value > 0
        ? `${classes.red} ${classes.xsIcon} fas fa-arrow-up xs`
        : `${classes.green} ${classes.xsIcon} fas fa-arrow-down xs`
      }
    />
    {value}%
  </div>
)
