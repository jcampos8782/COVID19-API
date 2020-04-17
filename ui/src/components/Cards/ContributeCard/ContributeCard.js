import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

export default class ContributeCard extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Card variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          title="Contribute"
          />
        <CardContent>
          <Typography variant="body2" align="justify">
            If you find this site useful, please consider making a small donation to help cover some of my
            hosting and maintenance costs. Every bit helps!
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.actionButton}
            variant="contained"
            aria-label="Donate"
            startIcon={<Icon className="fab fa-paypal" />}
            onClick={() => window.open('https://paypal.me/JasonCampos')}>
            Donate
          </Button>

          <Button
            className={classes.actionButton}
            variant="contained"
            aria-label="GitHub"
            startIcon={<Icon className="fab fa-github" />}
            onClick={() => window.open('https://github.com/jcampos8782/COVID19-API')}>
            GitHub
          </Button>
        </CardActions>
      </Card>
    );
  }
}
