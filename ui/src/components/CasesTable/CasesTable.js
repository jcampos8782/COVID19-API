import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
                            this.props.cases.map((c,idx) => (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">{ c.date }</TableCell>
                                    <TableCell component="th" scope="row">{ c.region }</TableCell>
                                    <TableCell component="th" scope="row">{ c.municipality }</TableCell>
                                    <TableCell component="th" scope="row">{ c.confirmed }</TableCell>
                                    <TableCell component="th" scope="row">{ c.recovered }</TableCell>
                                    <TableCell component="th" scope="row">{ c.deaths }</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
