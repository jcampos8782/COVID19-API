import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import ErrorCard from '../ErrorCard';
import { formatDateString } from '../../../util';

export default class HeadlinesCard extends React.Component {
  componentDidMount() {
    this.props.fetchHeadlines();
  }

  render() {
    const {
      classes,
      headlines,
      changePage,
      changeRowsPerPage
    } = this.props;

    const {
      currentPage,
      rowsPerPage,
      rowsPerPageOptions
    } = headlines.paging;

    if (headlines.error) {
      return <ErrorCard message={headlines.error} />
    }

    return (
      <Card variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          title="Headlines"
        />
        <CardContent className={classes.paneCard}>
          {
            headlines.loading ?
              <LinearProgress variant="query" /> :
              <div>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {
                        headlines.articles.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((headline,idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <CardMedia component="img" image={headline.imgSrc} />
                                </Grid>
                                <Grid item xs={8}>
                                  <Typography variant="body2" align="justify"><Link className={classes.link} href={headline.url}>{headline.title}</Link></Typography>
                                  <Typography variant="caption"> Published on {formatDateString(new Date(headline.publishedAt))} by {headline.source}</Typography>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={headlines.articles.length}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  onChangePage={changePage}
                  onChangeRowsPerPage={changeRowsPerPage}
                  />
                </div>
          }
        </CardContent>
      </Card>
    )
  }
}
