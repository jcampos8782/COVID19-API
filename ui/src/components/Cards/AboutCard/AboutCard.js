import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default class ErrorCard extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Card variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          title="About"
          />
        <CardContent>
          <Typography variant="body2" align="justify">
            This is an Open Source project available on <Link className={classes.link} href="https://github.com/jcampos8782/COVID19-API">GitHub</Link>.
            A special thank you to others making open source contributions that have made this project possible.
          </Typography>
          <br />
          <Typography variant="body2" align="justify">
            If there is a particular feature you would like to see, have encountered an error, or would like to discuss how you could
            contribute me, connect with me over email, LinkedIn, or Facebook.
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
