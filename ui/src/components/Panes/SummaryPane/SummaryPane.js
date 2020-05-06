import React from 'react';

import Grid from '@material-ui/core/Grid';

import TabPanel from '../TabPanel';

import HospitalizationBadges from '../../HospitalizationBadges';
import Recent from '../../Recent';
import RegionOverviewBadges from '../../RegionOverviewBadges';
import Rt from '../../Rt';
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
            <Recent />
            <Rt />
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <HospitalizationBadges />
                </Grid>
                <Grid item xs={12} sm={8}>
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
