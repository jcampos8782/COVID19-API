import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default class LinksCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          title="Links"
          />
        <CardContent>
          <Typography variant="h6">Resources</Typography>
          <Typography variant="body2">
            <Link className={classes.link} href="https://coronavirus.jhu.edu/" rel="noopener">Johns Hopkin's University</Link>
          </Typography>
          <Typography variant="body2">
            <Link className={classes.link} href="https://www.cdc.gov/" rel="noopener">Centers for Disease Control (CDC)</Link>
          </Typography>
          <Typography variant="body2">
            < Link className={classes.link} href="https://www.who.int/" rel="noopener">World Health Organization</Link>
          </Typography>
          <Divider light style={{marginTop: 10, marginBottom: 10}}/>
          <Typography variant="h6">Data Sources</Typography>
          <Typography variant="body2">
            <Link className={classes.link} href="https://github.com/CSSEGISandData/COVID-19" rel="noopener">John's Hopkins University Data</Link>
          </Typography>
          <Typography variant="body2">
            < Link className={classes.link} href="https://github.com/carranco-sga/Mexico-COVID-19" rel="noopener">Mexico State Data</Link>
          </Typography>
          <Typography variant="body2">
            < Link className={classes.link} href="https://newsapi.org" rel="noopener">News Feed</Link>
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
