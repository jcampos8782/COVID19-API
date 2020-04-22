import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import LocationBreadcrumb from '../LocationBreadcrumb';
import Filters from '../Filters';

import * as Panes from '../Panes';
import * as Cards from '../Cards';

export default class Dashboard extends React.Component {

  render() {
    const { data, meta, view, classes } = this.props;
    if (data.length === 0) {
      return <div/>;
    }

    return (
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="flex-start"
        justify="flex-start">
        <Grid item xs={12} md={12} lg={9}>
          <Grid container>
            <Grid className={classes.breadcrumbs} item xs={12} style={{paddingLeft:30}}>
              <LocationBreadcrumb
                className={classes.breadcrumbs}
                locations={meta.locations}
                loadRegion={this.props.loadRegion}
                />
            </Grid>
            <Grid item xs={12}>
              <Tabs
                className={classes.tabsContainer}
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
              <Grid container direction="row-reverse" spacing={1}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Card variant="outlined" >
                    <CardHeader
                      className={classes.cardHeader}
                      title={
                        <Filters />
                        }
                      />
                    <CardContent className={classes.paneCard}>
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
