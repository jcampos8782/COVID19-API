import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default class LocationBreadcrumb extends React.Component {
  render() {
    const { locations, loadRegion } = this.props;
    if (locations.length === 0) {
      return <div />;
    }

    return (
      <Breadcrumbs aria-label="locations">
        {
          locations.map((l,i) => {
            if (i === locations.length - 1) {
              return <Typography variant="h5" key={i}> {l.name} </Typography>;
            }
            return (
              <Link key={i} href="#" onClick={() => loadRegion(i, l.id)}>
                <Typography variant="h5">{l.name}</Typography>
              </Link>
            );
          })
        }
      </Breadcrumbs>
  );
  }
}
