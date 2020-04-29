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
                <Container key={i} className={classes.breadcrumbItem}>
                  <Typography className={classes.breadcrumbText} variant="h5"> {l.name}</Typography>
                  {l.contacts && <ContactLinks {...this.props} contacts={l.contacts} /> }
                </Container>
              );
            }
            return (
              <Container key={i} className={classes.breadcrumbItem}>
                <Link key={i} href="#" className={classes.link} onClick={() => loadRegion(l.id)}>
                  <Typography className={classes.breadcrumbText} variant="h5">{l.name}</Typography>
                </Link>
                {l.contacts && <ContactLinks {...this.props} contacts={l.contacts} /> }
              </Container>
            );
          })
        }
      </Breadcrumbs>
    );
  }
}

const ContactLinks = ({contacts,classes}) => {
  return (
  <Container style={{display: 'contents'}}>
    {
      contacts.www &&
      <Link href="#" onClick={() => window.open(contacts.www)}>
        <Icon className={`${classes.breadcrumbIcon} fas fa-globe`}/>
      </Link>
    }
    { contacts.www && contacts.twitter && <span>&nbsp;</span> }
    {
      contacts.twitter &&
      <Link href="#" onClick={() => window.open(`https://twitter.com/${contacts.twitter}`)}>
        <Icon className={`${classes.breadcrumbIcon} fab fa-twitter`}/>
      </Link>
    }
  </Container>
)}
