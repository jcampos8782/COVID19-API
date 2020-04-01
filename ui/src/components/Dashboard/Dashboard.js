import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SeriesDataTable from '../SeriesDataTable';
import TimeSeriesLineChart from '../TimeSeriesLineChart';

export default class Dashboard extends React.Component {

  render() {
    if (this.props.data.length === 0) {
      return <div/>;
    }
    return (
      <Container>
        <Grid container >
        {
          this.props.data.map(series => (
              <Grid item key={`${series.id}-stacked`} style={{height:300}} xs={12} sm={12} md={6}>
                <Typography variant="overline">
                  {series.id}: {series.current}
                </Typography>

                <TimeSeriesLineChart
                  title={series.id}
                  data={[{id: 'Total', data: series.stacked.total }, {id: 'Daily', data: series.stacked.daily }]} />
              </Grid>
          ))
        }
        {
          <Grid item xs={6} sm={12}>
            <Container maxWidth="md">
              <SeriesDataTable />
            </Container>
          </Grid>
        }
        </Grid>
      </Container>
    );
  }
}
