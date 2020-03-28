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

export default class CasesTable extends React.Component {
    render() {
        // Series data is in the form { <name>: [data...] }
        let series = Object.keys(this.props.data);
        return (
            <Paper>
              <Toolbar>
                <Typography variant="h6" component="div">
                  {this.props.title}
                </Typography>
              </Toolbar>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                      <TableRow>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {
                          series.map(name => {
                            return (
                              <TableRow key={name}>
                                <TableCell component="th" scope="row">{name}</TableCell>
                                {
                                  this.props.data[name].map(data => <TableCell component="td">data</TableCell>)
                                }
                              </TableRow>
                            );
                          })
                      }
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        );
    }
}
