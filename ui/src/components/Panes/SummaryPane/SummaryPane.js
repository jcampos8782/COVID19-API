import React from 'react';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import BadgedIcon from '../../BadgedIcon';
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
      loading,
      data
    } = this.props;

    return (
      <TabPanel
        value={value}
        index={index}
        children={
          <Grid container>
            <RegionOverviewBadges />
            {loading || !data.trends["confirmed"] ? <LinearProgress style={{margin:150}} variant="query" /> : <Trends {...this.props} /> }
            <HospitalizationBadges />
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={6}>
                {loading || !data.trends["confirmed"] ? <LinearProgress style={{margin:150}} variant="query" /> : <Recent {...this.props} /> }
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

const Trends = ({columns, theme, data, classes}) => (
  <Grid container style={{marginTop: 10}}>
    <Grid item xs={12}>
      <Typography variant="h6">
        Growth Rate
      </Typography>
    </Grid>
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
              obj[date] = data.trends[key].rollingGrowth[idx]
              return obj;
            },{})
          }))
        }
        />
    </Grid>
    <Grid item xs={12}>
      <Grid container >
        <Grid item xs={12} sm={3} md={2}>
          <Grid container>
            <Grid item xs={6} sm={12}>
              <BadgedIcon
                title="Will double in"
                iconClass={`${classes.orange} fas fa-head-side-cough`}
                value={`${data.trends["confirmed"].doubling} days`}
                />
            </Grid>
            <Grid item xs={6} sm={12}>
              <BadgedIcon
                title="Will double in"
                color="error"
                iconClass="fas fa-skull-crossbones"
                value={`${data.trends["deaths"].doubling} days`}
                />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{height: 300, marginTop: 15}} xs={12} sm={9} md={10}>
          <TimeSeriesLineChart
            curve="natural"
            labelFormat={v => `${v}%`}
            max={100}
            theme={theme}
            data={data.keys.map(series => (
              {
                id: series,
                data: data.trends[series].rollingGrowth.map((val,idx) => ({
                    x: formatDateKey(columns[idx]),
                    y: val
                  }
                ))
              }
            ))
          }
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

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
