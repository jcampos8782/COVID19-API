import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import ErrorCard from '../ErrorCard';
import { formatDateString } from '../../../util';

export default class HeadlinesCard extends React.Component {

  render() {
    const { classes, headlines } = this.props;

    return (
      <Card variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          title="Headlines"
          />
        <CardContent className={classes.paneCard}>
          {
            headlines.error ?
              <ErrorCard message={headlines.error} /> :

              headlines.articles.map((headline,idx) => {
                return (
                  <Card variant="outlined" key={idx}>
                    <CardContent>
                      <Typography variant="body2"><Link className={classes.link} href={headline.url}>{headline.title}</Link></Typography>
                      <Typography variant="caption"> Published on {formatDateString(new Date(headline.publishedAt))} by {headline.source}</Typography>
                    </CardContent>
                  </Card>
                )
              })
          }
        </CardContent>
      </Card>
    )
  }
}
