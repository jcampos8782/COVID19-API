import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import LocationBreadcrumb from '../LocationBreadcrumb';
import Filters from '../Filters';

import * as Panes from '../Panes';
import * as Cards from '../Cards';

export default class Dashboard extends React.Component {

  render() {
    const { region, refresh, classes, tab } = this.props;

    return (
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="flex-start"
        justify="flex-start">
        <Grid item xs={12} md={12} lg={9}>
          <Grid container>
            <Grid className={classes.breadcrumbs} item xs={12}>
              <LocationBreadcrumb />
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  className={classes.tabsContainer}
                  value={tab}
                  onChange={this.props.selectTab}
                  variant="scrollable"
                  scrollButtons="on"
                  >
                  <Tab label="Summary" {...a11yProps(0)} />
                  <Tab label="History" {...a11yProps(1)} />
                  <Tab label="Subregions" {...a11yProps(2)} disabled={region && region.subregions.length === 0}/>
                  <Tab label="Data" {...a11yProps(3)} />
                </Tabs>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row-reverse" spacing={1}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Card variant="outlined" >
                      <CardHeader
                        className={classes.cardHeader}
                        title={
                          <Filters />
                          }
                        action={
                          <IconButton className={classes.smIcon} onClick={() => refresh(region.id)}>
                            <Icon className={`${classes.smIcon} fas fa-sync-alt`} />
                          </IconButton>
                        }
                        />
                      <CardContent className={classes.paneCard}>
                        <Panes.SummaryPane
                          value={tab}
                          index={0}
                          />
                        <Panes.HistoryPane
                          value={tab}
                          index={1}
                          />
                        <Panes.SubregionPane
                          value={tab}
                          index={2}
                          />
                        <Panes.DataPane
                          value={tab}
                          index={3}
                          />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Cards.HeadlinesCard />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={12}>
              <Cards.LinksCard />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <Cards.AboutCard />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <Cards.ContributeCard />
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
