import React from 'react';

import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

import Alert from '@material-ui/lab/Alert';

export default class Errors extends React.Component {
  render() {
    const { errors, clearErrors } = this.props;

      /* For now just show the first */
    return (
      <Container>
        <Snackbar
          open={errors.length > 0}
          anchorOrigin={{horizontal: 'center', vertical: 'top'}}
          autoHideDuration={5000}
          onClose={clearErrors}>
          <Alert onClose={clearErrors} severity="error">
            {errors[0]}
          </Alert>
        </Snackbar>
      </Container>
    )
  }
}
