import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import TimeSeriesLineChart from '../TimeSeriesLineChart';

import { formatDateKey } from '../../util';

export default class Recent extends React.Component {
  render() {
    const {
      columns,
      theme,
      period,
      recentPeriodOptions,
      updatePeriod,
      classes,
      data,
      loading
    } = this.props;

    if (loading) {
      return <CircularProgress style={{margin:150}} />
    }

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
                }))
              }
            ))
          }
          />
        </Grid>
      </Grid>
    );
  }
}
