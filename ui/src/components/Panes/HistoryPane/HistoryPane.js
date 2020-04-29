import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TabPanel from '../TabPanel';
import HeatCalendar from '../../HeatCalendar';
import TimeSeriesLineChart from '../../TimeSeriesLineChart';

import {formatDateKey} from '../../../util';

export default class HistoryPane extends React.Component {
  render() {
    const {
      data,
      columns,
      theme,
      index,
      value,
      classes,
      loading
    } = this.props;

    if (loading) {
      return <div />
    }
    
    return (
      <TabPanel
        value={value}
        index={index}
        children={
          Object.keys(data).map(key => (
            <Grid key={`${key}-history`} container>
              <Grid item xs={12} >
                <Typography variant="overline">
                  {key}: {data[key].current}
                </Typography>
              </Grid>
              <Grid item className={classes.historyCalendar} xs={12}>
                <HeatCalendar theme={theme}
                  from={formatDateKey(columns[0])}
                  to={formatDateKey(columns[columns.length - 1])}
                  data={
                    data[key].daily.map((cnt, idx) => {
                      return {
                        day: formatDateKey(columns[idx]),
                        value: cnt
                      }
                    })
                }
                />
              </Grid>
              <Grid item className={classes.lineChartContainer} xs={12}>
                <TimeSeriesLineChart
                  theme={theme}
                  title={key}
                  data={[
                    {
                      id: 'Total',
                      data: data[key].aggregate.map((val,idx) => ({
                          x: formatDateKey(columns[idx]),
                          y: val
                        }
                      ))
                    },
                    {
                      id: 'Daily',
                      data: data[key].daily.map((val,idx) => ({
                          x: formatDateKey(columns[idx]),
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
