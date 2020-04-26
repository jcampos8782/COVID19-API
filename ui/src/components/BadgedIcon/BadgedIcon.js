import React from 'react';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography'

export default class BadgedIcon extends React.Component {
  render() {
    const {
      title,
      iconClass,
      caption,
      color = "primary",
      value,
      classes
    } = this.props;

    return (
      <Grid container>
        <Grid item xs={6} >
          <Typography variant="caption" className={classes.badgedIconTitle}>{title}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">{caption}</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={3} lg={4}>
          <Icon color={color} className={`${classes.badgedIcon} ${iconClass}`}/>
        </Grid>
        <Grid item xs={8} sm={10} md={9} lg={8}>
          <Typography variant="button">{value}</Typography>
        </Grid>
      </Grid>
    );
  }
}
