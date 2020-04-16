import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

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
              return <span key={i}> {l.name} </span>;
            }
            return (
              <Link key={i} href="#" onClick={() => loadRegion(i, l.id)}>
                {l.name}
              </Link>
            );
          })
        }
      </Breadcrumbs>
  );
  }
}
