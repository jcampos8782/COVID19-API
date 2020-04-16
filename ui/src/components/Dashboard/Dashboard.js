import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Filters from '../Filters';
import * as Panes from '../Panes';

export default class Dashboard extends React.Component {

  render() {
    const { data, meta, view, classes } = this.props;
    if (data.length === 0) {
      return <div/>;
    }

    return (
      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="flex-start"
        justify="flex-start">
          <Grid item xs={12} md={7}>
            <Grid container>
              <Grid item xs={12}>
                <Filters />
              </Grid>
              <Grid item xs={12} style={{zIndex: 10}}>
               <Grid container xs={12}>
                <Tabs
                  value={view.selectedTabId}
                  onChange={this.props.selectTab}
                  variant="scrollable"
                  scrollButtons="on"
                  >
                  <Tab label="Summary" {...a11yProps(0)} />
                  <Tab label="History" {...a11yProps(1)} />
                  <Tab label="Subregions" {...a11yProps(2)} disabled={meta.subregions.length === 0}/>
                  <Tab label="Data" {...a11yProps(3)} />
                </Tabs>
              </Grid>
              <Grid item xs={12}>
                <Panes.SummaryPane {...this.props}
                  value={view.selectedTabId}
                  index={0}
                  />
                <Panes.HistoryPane {...this.props}
                  value={view.selectedTabId}
                  index={1}
                  />
                <Panes.SubregionPane {...this.props}
                  value={view.selectedTabId}
                  index={2}
                  />
                <Panes.DataPane {...this.props}
                  value={view.selectedTabId}
                  index={3}
                  />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} >
          <Grid container xs={12} spacing={1}>
            <Grid item xs={12}>
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
                    variant="contained"
                    color="primary"
                    className={classes.navButton}
                    aria-label="Donate"
                    startIcon={<Icon className="fab fa-paypal" />}
                    onClick={() => window.open('https://paypal.me/JasonCampos')}>
                    Donate
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="GitHub"
                    startIcon={<Icon className="fab fa-github" />}
                    onClick={() => window.open('https://github.com/jcampos8782/COVID19-API')}>
                    GitHub
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  className={classes.cardHeader}
                  title=<Typography variant="h6">Headlines</Typography>
                  />
                <CardContent>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  className={classes.cardHeader}
                  title=<Typography variant="h6">Other Resources</Typography>
                  />
                <CardContent>
                  <Typography variant="body2">
                    <Link href="https://coronavirus.jhu.edu/" rel="noopener">Johns Hopkin's University</Link>
                  </Typography>
                  <Typography variant="body2">
                    <Link href="https://www.cdc.gov/" rel="noopener">Centers for Disease Control (CDC)</Link>
                  </Typography>
                  <Typography variant="body2">
                    < Link href="https://www.who.int/" rel="noopener">World Health Organization</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  className={classes.cardHeader}
                  title=<Typography variant="h6">Sources &amp; Contributors</Typography>
                  />
                <CardContent>
                  <Typography variant="body" align="justify">
                    This project is made possible thanks to the wonders of the Open Source community. In turn, this project's
                    source code has also been made open source for anyone wishing to contribute.
                  </Typography>
                  <Divider light style={{marginTop: 10, marginBottom: 10}}/>
                  <Typography variant="body2">
                    <Link href="https://github.com/CSSEGISandData/COVID-19" rel="noopener">John's Hopkins University Data</Link>
                  </Typography>
                  <Typography variant="body2">
                    < Link href="https://github.com/carranco-sga/Mexico-COVID-19" rel="noopener">Mexico State Data</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const a11yProps = index => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
