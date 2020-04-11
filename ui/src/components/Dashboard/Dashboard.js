import React from 'react';

import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import * as Panes from '../Panes';

export default class Dashboard extends React.Component {

  render() {
    const { data, meta, view } = this.props;
    if (data.length === 0) {
      return <div/>;
    }

    return (
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justify="flex-start">
         <Grid item xs={12} style={{zIndex: 10}}>
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
    );
  }
}

const a11yProps = index => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
