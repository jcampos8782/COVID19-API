import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TabPanel from './TabPanel';
import HeatCalendar from '../HeatCalendar';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

import {formatDateKey} from '../../util';

export default class HistoryPane extends React.Component {
  render() {
    const {data, meta, view, index, value, classes} = this.props;
    return (
      <TabPanel
        value={value}
        index={index}
        children={
          Object.keys(data).map(series => (
            <Grid key={`${series}-history`} container>
              <Grid item xs={12} >
                <Typography variant="overline">
                  {series.id}: {series.current}
                </Typography>
              </Grid>
              <Grid item className={classes.historyCalendar} xs={12}>
                <HeatCalendar theme={view.theme}
                  from={formatDateKey(meta.columns[0])}
                  to={formatDateKey(meta.columns[meta.columns.length - 1])}
                  data={
                    data[series].data.aggregates.daily.map((cnt, idx) => {
                      return {
                        day: formatDateKey(meta.columns[idx]),
                        value: cnt
                      }
                    })
                }
                />
              </Grid>
              <Grid item className={classes.lineChartContainer} xs={12}>
                <TimeSeriesLineChart
                  theme={view.theme}
                  title={series.id}
                  data={[
                    {
                      id: 'Total',
                      data: data[series].data.aggregates.total.map((val,idx) => ({
                          x: formatDateKey(meta.columns[idx]),
                          y: val
                        }
                      ))
                    },
                    {
                      id: 'Daily',
                      data: data[series].data.aggregates.daily.map((val,idx) => ({
                          x: formatDateKey(meta.columns[idx]),
                          y: val
                        }
                      ))
                    }
                  ]}
                />
              </Grid>
            </Grid>
          ))
        }
        />
    );
  }
}
