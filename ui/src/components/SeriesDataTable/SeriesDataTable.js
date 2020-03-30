import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// const DATE_FORMAT = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })

export default class SeriesDataTable extends React.Component {

    render() {
        // Render an empty div if there is no data.
        if (this.props.data === null) {
          return <div></div>;
        }

        let columnHeadings = this.props.meta.columns.map((heading,idx) => (
          <TableCell key={idx}>{heading}</TableCell>
        ));

        let selectedSubregionId = this.props.meta.selectedSubregionId;
        let subregions = this.props.data.subregions
          .filter(s => selectedSubregionId === -1 || s.id === selectedSubregionId);

        let subregionRows = subregions.map((subregion,idx) => {
          let seriesTitles = Object.keys(subregion.series);
          let dataRows = seriesTitles.map(title => {
            return (
              <TableRow key={title}>
                <TableCell scope="row">{title}</TableCell>
                {
                  subregion.series[title].map((data ,i)=> <TableCell key={i} component="td">{data}</TableCell>)
                }
              </TableRow>
            );
          });

          return (
            <TableRow key={`${subregion.region}-${idx}`}>
              <TableCell>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{subregion.region}</TableCell>
                      {columnHeadings}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { dataRows }
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          );
        });

        let subregionContainer = subregionRows.length === 0 ? <div></div> : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">SubRegions</Typography>
                    </TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                { subregionRows }
              </TableBody>
            </Table>
          </TableContainer>
        );

        let aggregateContainer = this.props.data.aggregate.series.length === 0 ? <div></div> : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Aggregate</Typography>
                    </TableCell>
                    {columnHeadings}
                  </TableRow>
              </TableHead>
              <TableBody>
                {
                  Object.keys(this.props.data.aggregate.series).map(title => {
                    return (
                      <TableRow key={title}>
                        <TableCell scope="row">{title}</TableCell>
                        {
                          this.props.data.aggregate.series[title].map((data ,i)=> <TableCell key={i} component="td">{data}</TableCell>)
                        }
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        );

        return (
            <Paper>
              <Toolbar>
                <Typography variant="h6" component="div">
                  {this.props.title}
                </Typography>
              </Toolbar>
              {aggregateContainer}
              {subregionContainer}
            </Paper>
        );
    }
}
