import React from 'react';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class TimeSeriesDataTable extends React.Component {

    render() {
        const {data, meta} = this.props;
        if (this.props.data === null) {
          return <div></div>;
        }

        let columnHeadings = meta.columns.map((heading,idx) => (
          <TableCell key={idx}>{heading}</TableCell>
        ));

        return (
            <Grid container>
              <Grid item xs={12}>
                <Toolbar>
                  <Typography variant="h6" component="div">
                    {meta.title}
                  </Typography>
                </Toolbar>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                        <TableRow>
                          <TableCell />
                          {columnHeadings}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        data.map(series => {
                          return (
                            <TableRow key={series.id}>
                              <TableCell component="th" variant="head" scope="row">{series.id}</TableCell>
                              {
                                series.data.map((data ,i)=> <TableCell key={i} component="td">{data}</TableCell>)
                              }
                            </TableRow>
                          );
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
        );
    }
}
