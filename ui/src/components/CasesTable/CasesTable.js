import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const DATE_FORMAT = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })

export default class CasesTable extends React.Component {
    render() {
        return (
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>Municipality</TableCell>
                            <TableCell>Confirmed Cases</TableCell>
                            <TableCell>Recovered</TableCell>
                            <TableCell>Deaths</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.cases.map((c,idx) => {
                                let [{ value: mo },,{ value: da },,{ value: ye }] = DATE_FORMAT.formatToParts(new Date(c.date));

                                return (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">{ `${mo}/${da}/${ye}` }</TableCell>
                                    <TableCell component="th" scope="row">{ c.location.region }</TableCell>
                                    <TableCell component="th" scope="row">{ c.location.municipality }</TableCell>
                                    <TableCell component="th" scope="row">{ c.summary.confirmed }</TableCell>
                                    <TableCell component="th" scope="row">{ c.summary.recovered }</TableCell>
                                    <TableCell component="th" scope="row">{ c.summary.deaths }</TableCell>
                                </TableRow>
                              );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
