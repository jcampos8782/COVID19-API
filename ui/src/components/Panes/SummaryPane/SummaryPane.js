import React from 'react';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import TabPanel from '../TabPanel';
import TimeSeriesHeatMap from '../../TimeSeriesHeatMap';
import TimeSeriesLineChart from '../../TimeSeriesLineChart';
import RegionOverviewBadges from '../../RegionOverviewBadges';
import HospitalizationBadges from '../../HospitalizationBadges';
import TestingResults from '../../TestingResults';

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
            {loading ? <LinearProgress variant="query" /> : <Trends {...this.props} /> }
            <HospitalizationBadges />
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={6}>
                {loading ? <LinearProgress variant="query" /> : <LastSeven {...this.props} /> }
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

const Trends = ({columns, theme, data}) => (
  <Grid container>
    <Grid item style={{height:30, marginTop: 15, marginBottom: 20}} xs={12} md={12} lg={12}>
      <TimeSeriesHeatMap
        keys={columns}
        theme={theme}
        data={
          //[{series: "series", "date":"value"...}]
          data.keys.map(key => (
          {
            series: key,
            ...columns.reduce((obj,date,idx) => {
              obj[date] = data.weeklyRateOfChange[key][idx]
              return obj;
            },{})
          }))
        }
        />
    </Grid>
  </Grid>
)

const LastSeven = ({columns, theme, data}) => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="h6">Last 7 Days</Typography>
    </Grid>
    <Grid item style={{height:300}} xs={12}>
      <TimeSeriesLineChart
        theme={theme}
        title="Last 7 Days"
        data={data.keys.map(series => (
          {
            id: series,
            data: data.recent[series].map((val,idx) => ({
                x: formatDateKey(columns[columns.length - 7 + idx]),
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
