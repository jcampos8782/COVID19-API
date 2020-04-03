import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import SeriesDataTable from '../SeriesDataTable';
import TimeSeriesLineChart from '../TimeSeriesLineChart';
import { formatDateKey } from '../TimeSeriesLineChart';

export default class Dashboard extends React.Component {

  render() {
    const { data, meta, view, classes } = this.props;

    if (data.length === 0) {
      return <div/>;
    }

    let historyCharts = data.map(series => (
      <Grid key={`${series.id}-history`} container>
        <Grid item xs={12} >
          <Typography variant="overline">
            {series.id}: {series.current}
          </Typography>
        </Grid>
        <Grid item style={{height:300}} xs={12}>
          <TimeSeriesLineChart
            title={series.id}
            data={[
              {
                id: 'Total',
                data: series.data.aggregates.total.map((val,idx) => ({
                    x: formatDateKey(this.props.meta.columns[idx]),
                    y: val
                  }
                ))
              },
              {
                id: 'Daily',
                data: series.data.aggregates.daily.map((val,idx) => ({
                    x: formatDateKey(this.props.meta.columns[idx]),
                    y: val
                  }
                ))
              }
            ]}
          />
        </Grid>
      </Grid>
    ));

    let recentCharts = (
      <Grid container>
        <Typography variant="h4">Current Totals</Typography>
        <Grid container spacing={5} style={{paddingBottom:30, paddingTop: 10}}>
        {
          data.map(series => (
            <Grid key={series.id} item xs={6} md={4} lg={3}>
              <Card variant="outlined" color="secondary">
                <CardHeader
                   avatar={
                     <Avatar className={classes[series.id]}>
                       <Icon className={view.icons[series.id].className}  />
                     </Avatar>
                   }
                   title=<Typography variant="h5"> {series.current} </Typography>
                   subheader={series.id}
                 />
              </Card>
            </Grid>
          ))
        }
        </Grid>

        <Typography variant="h4">Last 7 Days</Typography>
        <Grid container>
        {
          data.map(series => (
            <Grid item key={`${series.id}-recent`} style={{height:300}} xs={12} md={12} lg={6}>
              <TimeSeriesLineChart
                title={series.id}
                data={[
                  {
                    id: series.id,
                    data: series.data.recent.data.map((val,idx) => ({
                        x: formatDateKey(this.props.meta.columns[this.props.meta.columns.length - 7 + idx ]),
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
      </Grid>
    );

    let subregionCharts = meta.subregions.length === 0 ? <div /> : data.map(series => (
      <Grid item key={`${series.id}-subregions`} style={{height:300}} sm={12} md={12}>
        <TimeSeriesLineChart
          title={series.id}
          data={
            Object.keys(series.data.regions).map(region => ({
              id: region,
              data: series.data.regions[region].daily.map((val,idx) => ({
                  x: formatDateKey(meta.columns[idx]),
                  y: val
                }
              ))
            }))
          }
        />
      </Grid>
    ));

    let rawDataTable = (
            <SeriesDataTable
              meta={{...meta}}
              data={data.map(series => ({ id: series.id, data: series.data.aggregates.total}))}
              />
        );
    return (
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justify="flex-start">
         <Grid item xs={12}>
          <Tabs
            value={view.selectedTabId}
            onChange={this.props.selectTab}
            variant="scrollable"
            scrollButtons="on"
            >
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="History" {...a11yProps(1)} />
            <Tab label="Subregions" {...a11yProps(2)} disabled={meta.subregions.length === 0}/>
            <Tab label="Data" {...a11yProps(3)} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
        <TabPanel
          value={view.selectedTabId}
          index={0}
          children={recentCharts}
          />
        <TabPanel
          value={view.selectedTabId}
          index={1}
          children={historyCharts}
          />
        <TabPanel
          value={view.selectedTabId}
          index={2}
          children={subregionCharts}
          />
        <TabPanel
          value={view.selectedTabId}
          index={3}
          children={rawDataTable}
          />
        </Grid>
      </Grid>
    );
  }
}

const TabPanel = props => {
  const { children, value, index } = props;
  return (
    <Paper
      variant="outlined"
      elevation={3}
      style={{
        padding: 20,
        display: value !== index ? 'none' : ''
      }}>
    <Grid
      role="tabpanel"
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      >
        {children}
    </Grid>
  </Paper>
  );
}

const a11yProps = index => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
