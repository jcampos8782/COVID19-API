import React from 'react';

import Grid from '@material-ui/core/Grid';

import TabPanel from '../TabPanel';

import HospitalizationBadges from '../../HospitalizationBadges';
import Recent from '../../Recent';
import RegionOverviewBadges from '../../RegionOverviewBadges';
import TestingResults from '../../TestingResults';
import Trends from '../../Trends';

export default class SummaryPane extends React.Component {
  render() {
    const {
      value,
      index
    } = this.props;

    return (
      <TabPanel
        value={value}
        index={index}
        children={
          <Grid container>
            <RegionOverviewBadges />
            <Trends />
            <HospitalizationBadges />
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={6}>
                <Recent />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TestingResults />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      />
    )
  }
}
