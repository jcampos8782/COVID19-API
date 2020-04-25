import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default class LocationBreadcrumb extends React.Component {
  render() {
    const { locations, loadRegion, classes, loading } = this.props;

    return (
      <Breadcrumbs aria-label="locations">
        {
          loading ? <Typography style={{visibility: 'hidden'}} variant="h5">...</Typography> : locations.map((l,i) => {
            if (i === locations.length - 1) {
              return (
                <Container style={{display: 'inline-flex', alignItems: 'baseline', padding: 0}}>
                  <Typography style={{paddingRight: 10}} variant="h5" key={i}> {l.name} </Typography>
                  <ContactLinks {...this.props} />
                </Container>
              );
            }
            return (
              <Link key={i} href="#" className={classes.link} onClick={() => loadRegion(l.id)}>
                <Typography variant="h5">{l.name}</Typography>
              </Link>
            );
          })
        }
      </Breadcrumbs>
    );
  }
}

const ContactLinks = ({contacts,classes}) => {
  console.log(contacts);
  return (
  <Container style={{display: 'contents'}}>
    {
      contacts.www &&
      <Link href="#" onClick={() => window.open(contacts.www)}>
        <Icon style={{fontSize: '1.0rem'}} className='fas fa-globe'/>
      </Link>
    }
    &nbsp;
    {
      contacts.twitter &&
      <Link href="#" onClick={() => window.open(`https://twitter.com/${contacts.twitter}`)}>
        <Icon style={{fontSize: '1.0rem'}} className='fab fa-twitter'/>
      </Link>
    }
  </Container>
)}
