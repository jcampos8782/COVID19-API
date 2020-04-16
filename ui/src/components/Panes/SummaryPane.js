import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import TabPanel from './TabPanel';
import TimeSeriesHeatMap from '../TimeSeriesHeatMap';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

import { formatDateKey, formatDateString } from '../../util';

export default class SummaryPane extends React.Component {
  render() {
    const { data, meta, view, classes, value, index } = this.props;

    let trends = (
      <Grid container>
        <Typography variant="h6">Trends</Typography>
        <Grid item style={{height:30, marginTop: 15, marginBottom: 20}} xs={12} md={12} lg={12}>
          <TimeSeriesHeatMap
            keys={meta.columns}
            theme={view.theme}
            data={
              //[{series: "series", "date":"value"...}]
              data.map(series => (
              {
                series: series.id,
                ...meta.columns.reduce((obj,date,idx) => {
                  let values = series.data.aggregates.daily;
                  let current = values[idx];
                  let lastWeek = idx > 7 ? values[idx - 7] : values[0];
                  let difference = current - lastWeek;
                  let denom = lastWeek === 0 ? 1 : lastWeek;
                  let percentChange = ((difference / denom) * 100).toFixed(2);
                  obj[date] = parseFloat(percentChange)
                  return obj;
                },{})
              }))
            }
            />
        </Grid>
      </Grid>
    );

    let totalCards = (
      <Grid item xs={12}>
        <Grid container spacing={1} style={{paddingBottom:10, paddingTop: 10}}>
          {
            data.map(series => {
              let last = series.current;
              let previous = series.data.aggregates.total[series.data.aggregates.total.length - 2];
              let d = previous === 0 ? 1 : previous;
              let percentChange = ((last - previous)/d * 100).toFixed(1);
              let iconClass = percentChange >= 0 ? `${classes.red} fas fa-arrow-up xs` : `${classes.green} fas fa-arrow-down xs`;
              let diffIcon = <Icon className={`${classes.xsIcon} ${iconClass}`} />

              return (
                <Grid key={series.id} item xs={12} md={6}>
                  <Card variant="outlined" color="secondary">
                    <CardHeader
                      style={{paddingLeft: 10, paddingTop:16, paddingBottom: 16 }}
                       avatar={
                         <Avatar className={classes[series.id]} style={{marginRight: -11}}>
                           <Icon className={view.icons[series.id].className}  />
                         </Avatar>
                       }
                       title=<Typography variant="h5" style={{fontSize: '1.25rem'}}> {series.current} </Typography>
                       subheader="Total"
                       action={
                         <Typography variant="caption" style={{fontSize: '0.75rem'}}> {percentChange}% {diffIcon}</Typography>
                       }
                     />
                    <CardContent className={classes.cardBody}>
                      <Typography variant="overline">{series.id}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    );

    let dailyCards = (
      <Grid item xs={12}>
        <Grid container spacing={1} style={{paddingBottom:30, paddingTop: 10}}>
        {
          data.map(series => {
            let recentData = series.data.recent.data;
            let last = recentData[recentData.length - 1];
            let previous = recentData[recentData.length - 2];
            let d = previous === 0 ? 1 : previous;
            let percentChange = ((last - previous)/d * 100).toFixed(1);
            let iconClass = percentChange >= 0 ? `${classes.red} fas fa-arrow-up xs` : `${classes.green} fas fa-arrow-down xs`;
            let diffIcon = <Icon className={`${classes.xsIcon} ${iconClass}`} />

            return (
              <Grid key={series.id} item xs={12} md={6}>
                <Card variant="outlined" color="secondary">
                  <CardHeader
                    style={{paddingLeft: 10, paddingTop:16, paddingBottom: 16 }}
                      avatar={
                        <Avatar className={classes[series.id]} style={{marginRight: -11}}>
                          <Icon className={view.icons[series.id].className}  />
                        </Avatar>
                      }
                      title={
                          <Typography variant="h5" style={{fontSize: '1.25rem'}}>
                            {series.data.recent.data[series.data.recent.data.length - 1]}
                          </Typography>
                      }
                      subheader={
                        <Typography variant="caption">
                          {formatDateString(new Date(meta.columns[meta.columns.length -1]))}
                        </Typography>
                      }
                      action={
                        <Typography variant="caption" style={{fontSize: '0.75rem'}}> {percentChange}% {diffIcon}</Typography>
                      }
                  />
                  <CardContent className={classes.cardBody}>
                    <Typography variant="overline">{series.id}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        }
        </Grid>
      </Grid>
    );

    let lastSeven = (
      <Grid container>
      {
        data.map(series => (
          <Grid item key={`${series.id}-recent`} style={{height:300}} xs={12} md={12} lg={6}>
            <TimeSeriesLineChart
              theme={view.theme}
              title={series.id}
              data={[
                {
                  id: series.id,
                  data: series.data.recent.data.map((val,idx) => ({
                      x: formatDateKey(meta.columns[meta.columns.length - 7 + idx]),
                      y: val
                    }
                  ))
                }
              ]}
            />
          </Grid>
        ))
      }
      </Grid>
    );

    return (
      <TabPanel
        value={value}
        index={index}
        children={
          <Grid container>
            {trends}
            <Grid item xs={12} spacing={1}>
              <Grid container>
                {totalCards}
                {dailyCards}
              </Grid>
            </Grid>
            <Typography variant="h6">Last 7 Days</Typography>
            {lastSeven}
          </Grid>
        }
      />
    )
  }
}
