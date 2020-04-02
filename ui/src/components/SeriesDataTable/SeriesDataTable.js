import React from 'react';

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class SeriesDataTable extends React.Component {

    render() {
        const {data, meta} = this.props;
        // Render an empty div if there is no data.
        if (this.props.data === null) {
          return <div></div>;
        }

        let columnHeadings = meta.columns.map((heading,idx) => (
          <TableCell key={idx}>{heading}</TableCell>
        ));

        let selectedSubregionId = meta.selectedSubregionId;
        let subregions = data.subregions
          .filter(s => selectedSubregionId === -1 || s.id === selectedSubregionId);

        let subregionRows = subregions.map((subregion,idx) => {
          let dataRows = subregion.data.map((series, idx) => {
            return (
              <TableRow key={series.id}>
                <TableCell scope="row">{series.id}</TableCell>
                {
                  series.data.map((data ,i)=> <TableCell key={i} component="td">{data}</TableCell>)
                }
              </TableRow>
            );
          });

          return (
            <TableRow key={`${subregion.id}-${idx}`}>
              <TableCell>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{subregion.id}</TableCell>
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

        let aggregateContainer = data.aggregate.length === 0 ? <div></div> : (
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
                  data.aggregate.map(series => {
                    return (
                      <TableRow key={series.id}>
                        <TableCell scope="row">{series.id}</TableCell>
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
        );

        return (
            <Container>
              <Toolbar>
                <Typography variant="h6" component="div">
                  {meta.region}
                </Typography>
              </Toolbar>
              {aggregateContainer}
              {subregionContainer}
            </Container>
        );
    }
}
