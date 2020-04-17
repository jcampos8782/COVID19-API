import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

export default class ErrorCard extends React.Component {

  render() {
    const { classes, message } = this.props;

    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2">{message}</Typography>
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
        </CardActions>
      </Card>
    )
  }
}
