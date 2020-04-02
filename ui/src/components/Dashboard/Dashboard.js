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
    const { data, meta, view } = this.props;

    if (data.length === 0) {
      return <div/>;
    }

    let historyCharts = data.map(series => (
        <Grid item key={`${series.id}-history`} style={{height:300}} sm={12} md={12}>
          <Typography variant="overline">
            {series.id}: {series.current}
          </Typography>

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
    ));

    let recentCharts = (
      <Container>
        <Typography variant="h4">Current Totals</Typography>
        <Grid container spacing={5} style={{paddingBottom:30, paddingTop: 10}}>
        {
          data.map(series => (
            <Grid key={series.id} item sm={3}>
              <Card variant="outlined" color="secondary">
                <CardHeader
                   avatar={
                     <Avatar>
                       <Icon className={view.icons[series.id]} />
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
            <Grid item key={`${series.id}-recent`} style={{height:300}} sm={12} md={6}>
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
      </Container>
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
          <Grid item xs={6} sm={12}>
            <Container maxWidth="md">
              <SeriesDataTable
                meta={{...meta}}
                data={{
                  aggregate: data.map(series => ({ id: series.id, data: series.data.aggregates.total})),
                  subregions: meta.selectedSubItemId !== -1 ? [] : meta.subregions.map(subregion => {
                    return {
                      id: subregion,
                      data: data.map(series => ({id: series.id, data: series.data.regions[subregion].total }))
                    };
                  })
                }}
                />
            </Container>
          </Grid>
        );
    return (
      <Container maxWidth="xl">
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
      </Container>
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
