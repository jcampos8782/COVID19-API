import React from 'react';

import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import SelectFilter from './SelectFilter'
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

export default class Filters extends React.Component {
  render() {
      const { classes, location } = this.props;
      let locationIcon = (
        <Tooltip title={`Location ${location.enabled ? 'enabled' : 'disabled'}`} placement="top-end">
            <Icon className={`${location.enabled ? classes.success : classes.warning} fas fa-map-marker-alt fa-xs`} />
          </Tooltip>
      );

      let seriesFilter = (
        <SelectFilter
          label="Series"
          selected={this.props.selectedSeriesId}
          onChange={(e) => this.props.selectSeries(e.target.value, this.props.selectedRegionId)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={this.props.series.map(r => ({ id: r.id, text: r.name }))} />
      )

      let regionsFilter = (
        <SelectFilter
          label=<div>{locationIcon} Region</div>
          selected={this.props.selectedRegionId}
          onChange={(e) => this.props.selectRegion(e.target.value, this.props.selectedSeriesId)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={this.props.regions.map(r => ({ id: r.id, text: r.name }))} />
      );

      let subregionsFilter = (
        <SelectFilter
          label="Subregion"
          selected={this.props.selectedSubregionId}
          disabled={this.props.subregions.length === 0}
          onChange={(e) => this.props.selectSubregion(e.target.value)}
          default=<MenuItem value="-1" selected><em>None</em></MenuItem>
          options={this.props.subregions.map(r => ({ id: r.id, text: r.name }))} />
      );

      return (
          <Grid item
            className={classes.filters}>
              {regionsFilter}
              {subregionsFilter}
              {seriesFilter}
          </Grid>
      );
  }
}
