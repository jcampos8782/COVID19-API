import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TimeSeriesLineChart from '../TimeSeriesLineChart';
import { formatDateKey } from '../TimeSeriesLineChart';

import StackedBarChart from '../StackedBarChart';

export default class Dashboard extends React.Component {

  render() {
    if (this.props.data.length === 0) {
      return <div/>;
    }

    let timeseriesCharts = this.props.data.map(series => (
        <Grid item key={`${series.id}-stacked`} style={{height:300}} sm={12} md={6}>
          <Typography variant="overline">
            {series.id}: {series.current}
          </Typography>

          <TimeSeriesLineChart
            title={series.id}
            data={[
              {
                id: 'Total',
                data: series.data.aggregates.total.map((val,idx) => {
                  return {
                    x: formatDateKey(this.props.meta.columns[idx]),
                    y: val
                  };
                })
              },
              {
                id: 'Daily',
                data: series.data.aggregates.daily.map((val,idx) => {
                  return {
                    x: formatDateKey(this.props.meta.columns[idx]),
                    y: val
                  }
                })
              }
            ]}
          />
        </Grid>
    ));

    let subregionBreakdown = this.props.meta.subregions.length === 0 ? <div /> : this.props.data.map(series => (
      <Grid item key={`${series.id}-date`} style={{height:300}} sm={12} md={6}>
        <StackedBarChart
          title={series.id}
          keys={this.props.meta.subregions}
          data={
            this.props.meta.columns.map((date,idx) => {
              return {
                id: date,
                ...Object.keys(series.data.regions).reduce((acc, region) => {
                  acc[region] = series.data.regions[region].daily[idx];
                  return acc;
                }, {})
              };
            })
          }
        />
      </Grid>
    ));

    return (
      <Container>
        <Grid container >
          { timeseriesCharts }
          { subregionBreakdown }
        </Grid>
      </Container>
    );
  }
}
