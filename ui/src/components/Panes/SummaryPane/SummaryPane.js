import React from 'react';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import TabPanel from '../TabPanel';
import TimeSeriesLineChart from '../../TimeSeriesLineChart';
import RegionOverviewBadges from '../../RegionOverviewBadges';
import HospitalizationBadges from '../../HospitalizationBadges';
import TestingResults from '../../TestingResults';
import Trends from '../../Trends';

import { formatDateKey } from '../../../util';

export default class SummaryPane extends React.Component {
  render() {
    const {
      value,
      index,
      loading
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
                {loading ? <LinearProgress style={{margin:150}} variant="query" /> : <Recent {...this.props} /> }
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

const Recent = ({columns, theme, period, recentPeriodOptions, updatePeriod, classes, data}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Recent</Typography>
        <Slider
          className={classes.recentDataSlider}
          defaultValue={recentPeriodOptions[0]}
          max={recentPeriodOptions[recentPeriodOptions.length - 1]}
          step={null}
          valueLabelDisplay="auto"
          marks={recentPeriodOptions.map(p => ({ value: p, label: `${p} Days`}))}
          onChangeCommitted={(e, period) =>  updatePeriod(period)}
          />
      </Grid>
      <Grid item style={{height:300}} xs={12}>
        <TimeSeriesLineChart
          theme={theme}
          title={`Last ${period} days`}
          data={data.keys.map(series => (
            {
              id: series,
              data: data.recent[series].map((val,idx) => ({
                  x: formatDateKey(columns[columns.length - period + idx]),
                  y: val
                }
              ))
            }
          ))
        }
        />
      </Grid>
    </Grid>
  )
}
