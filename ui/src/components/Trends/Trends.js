import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import BadgedIcon from '../BadgedIcon';
import TimeSeriesHeatMap from '../TimeSeriesHeatMap';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

import { formatDateKey } from '../../util';

export default class Trends extends React.Component {
  render() {
    const {
      columns,
      theme,
      data,
      loading,
      classes
    } = this.props;

    if (loading) {
      return <CircularProgress style={{margin:150}} />;
    };

    let doublingConfirmed = data.trends["confirmed"].doubling;
    let doublingDeaths = data.trends["deaths"].doubling
    return (
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
              <Grid container className={classes.trendsDoublingContainer}>
                <Grid item xs={6} sm={12}>
                  <BadgedIcon
                    title="Will double in"
                    iconClass={`${classes.orange} fas fa-head-side-cough`}
                    value={
                      Number.isFinite(doublingConfirmed)
                        ? `${doublingConfirmed} days`
                        : <Icon className={`${classes.xsIcon} fas fa-infinity`} />
                      }
                    />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <BadgedIcon
                    title="Will double in"
                    color="error"
                    iconClass="fas fa-skull-crossbones"
                    value={
                      Number.isFinite(doublingDeaths)
                        ? `${doublingDeaths} days`
                        : <Icon className={`${classes.xsIcon} fas fa-infinity`} />
                      }
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
  }
}
