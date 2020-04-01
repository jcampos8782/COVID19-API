import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SeriesDataTable from '../SeriesDataTable';
import TimeSeriesLineChart from '../TimeSeriesLineChart';
import StackedBarChart from '../StackedBarChart';

export default class Dashboard extends React.Component {

  render() {
    if (this.props.data.length === 0) {
      return <div/>;
    }

    let timeseriesCharts = this.props.data.map(series => (
        <Grid item key={`${series.id}-stacked`} style={{height:300}} xs={12} sm={12} md={6}>
          <Typography variant="overline">
            {series.id}: {series.current}
          </Typography>

          <TimeSeriesLineChart
            title={series.id}
            data={[{id: 'Total', data: series.stacked.total }, {id: 'Daily', data: series.stacked.daily }]} />
        </Grid>
    ));

    let subregionBreakdown = this.props.meta.subregions.length === 0 ? <div /> : this.props.data.map(series => (
      <Grid item key={`${series.id}-date`} style={{height:300}} xs={12} sm={12} md={6}>
        <StackedBarChart
          title={series.id}
          keys={this.props.meta.subregions}
          data={series.regions} />
      </Grid>
    ));

    let dataTable = (
      <Grid item xs={6} sm={12}>
        <Container maxWidth="md">
          <SeriesDataTable />
        </Container>
      </Grid>
    );

    return (
      <Container>
        <Grid container >
          { timeseriesCharts }
          { subregionBreakdown }
          { dataTable }
        </Grid>
      </Container>
    );
  }
}
