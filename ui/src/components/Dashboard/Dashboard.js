import React from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SeriesDataTable from '../SeriesDataTable';
import TimeSeriesLineChart from '../TimeSeriesLineChart';
import { formatDateKey } from '../TimeSeriesLineChart';

import StackedBarChart from '../StackedBarChart';

export default class Dashboard extends React.Component {

  render() {
    if (this.props.data.length === 0) {
      return <div/>;
    }

    let timeseriesCharts = this.props.data.map(series => (
        <Grid item key={`${series.id}-stacked`} style={{height:300}} sm={12} md={12}>
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

    let subregionBreakdown = this.props.meta.subregions.length === 0 ? <div /> : this.props.data.map(series => (
      <Grid item key={`${series.id}-subregions`} style={{height:300}} sm={12} md={12}>
        <TimeSeriesLineChart
          title={series.id}
          data={
            Object.keys(series.data.regions).map(region => ({
              id: region,
              data: series.data.regions[region].daily.map((val,idx) => ({
                  x: formatDateKey(this.props.meta.columns[idx]),
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
              <SeriesDataTable />
            </Container>
          </Grid>
        );

    return (
      <Container>
        <Tabs
          value={this.props.view.selectedTabId}
          onChange={this.props.selectTab}
          variant="scrollable"
          scrollButtons="on"
          >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Time Series" {...a11yProps(1)} />
          <Tab label="Subregion Breakdown" {...a11yProps(2)} />
          <Tab label="Raw Data" {...a11yProps(3)} />
        </Tabs>
        <Grid container >
          <TabPanel
            value={this.props.view.selectedTabId}
            index={0}
            children={<Typography variant="h6">Coming Soon!</Typography>}
            />
          <TabPanel
            value={this.props.view.selectedTabId}
            index={1}
            children={timeseriesCharts}
            />
          <TabPanel
            value={this.props.view.selectedTabId}
            index={2}
            children={subregionBreakdown}
            />
          <TabPanel
            value={this.props.view.selectedTabId}
            index={3}
            children={rawDataTable}
            />
        </Grid>
      </Container>
    );
  }
}

const TabPanel = props => {
  const { children, value, index } = props;
  return (
    <Container
      role="tabpanel"
      style={{ display: value !== index ? 'none' : ''}}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
    >
      <Paper variant="outlined" elevation={3} style={{padding: 20 }}>
        {children}
      </Paper>
    </Container>
  );
}

const a11yProps = index => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
